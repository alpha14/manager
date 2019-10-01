import assignIn from 'lodash/assignIn';
import isBoolean from 'lodash/isBoolean';
import pick from 'lodash/pick';
import without from 'lodash/without';

angular.module('managerApp').factory('PackXdslModemDhcpBdhcpObject', (OvhApiXdsl, $translate, TucToast, $q) => {
  const template = {
    MACAddress: '',
    name: '',
    IPAddress: '',
  };

  /**
     * Object constructor
     * @param {Object} data Data from APIv6
     */
  const PackXdslModemDhcpBdhcpObject = function (data) {
    assignIn(
      this,
      template,
      pick(
        data,
        Object.keys(template),
      ),
    );
  };

  /**
     * Specify that the object has been read from the API
     */
  PackXdslModemDhcpBdhcpObject.prototype.inApi = function () {
    this.created = true;
  };

  /**
     * save a bdhcp
     * @param {String} serviceName Name of the Xdsl service
     * @param {String} lanName     Name of the Lan
     * @param {String} dhcpName    Name of the DHCP
     * @return {Promise}
     */
  PackXdslModemDhcpBdhcpObject.prototype.save = function (serviceName, lanName, dhcpName) {
    const self = this;
    this.busy = true;
    if (this.created) {
      return OvhApiXdsl.Modem().Lan().Dhcp().DHCPStaticAddress()
        .v6()
        .update(
          {
            xdslId: serviceName,
            lanName,
            dhcpName,
            MACAddress: this.MACAddress,
          },
          pick(this.tempValue, without(Object.keys(template), 'MACAddress')),
        ).$promise.then((data) => {
          TucToast.success($translate.instant('xdsl_modem_bdhcp_edit_success', { name: self.name }));
          assignIn(self, self.tempValue);
          self.toggleEdit(false);
          return data;
        }).catch((err) => {
          TucToast.error(`${$translate.instant('xdsl_modem_bdhcp_edit_error', { name: self.name })}<em>${err.data.message}</em>`);
          return $q.reject(err);
        }).finally(() => {
          self.busy = false;
        });
    }
    return OvhApiXdsl.Modem().Lan().Dhcp().DHCPStaticAddress()
      .v6()
      .post(
        {
          xdslId: serviceName,
          lanName,
          dhcpName,
        },
        pick(this.tempValue, Object.keys(template)),
      ).$promise.then((data) => {
        TucToast.success($translate.instant('xdsl_modem_bdhcp_add_success', { name: self.tempValue.name }));
        assignIn(self, self.tempValue);
        self.inApi();
        self.toggleEdit(false);
        return data;
      }).catch((err) => {
        TucToast.error(`${$translate.instant('xdsl_modem_bdhcp_add_error', { name: self.tempValue.name })}<em>${err.data.message}</em>`);
        return $q.reject(err);
      }).finally(() => {
        self.busy = false;
      });
  };

  /**
     * delete a bdhcp
     * @param {String} serviceName Name of the Xdsl service
     * @param {String} lanName     Name of the Lan
     * @param {String} dhcpName    Name of the DHCP
     * @return {Promise}
     */
  PackXdslModemDhcpBdhcpObject.prototype.remove = function (serviceName, lanName, dhcpName) {
    const self = this;
    this.busy = true;
    return OvhApiXdsl.Modem().Lan().Dhcp().DHCPStaticAddress()
      .v6()
      .delete({
        xdslId: serviceName,
        lanName,
        dhcpName,
        MACAddress: this.MACAddress,
      }).$promise.then(() => {
        TucToast.success($translate.instant('xdsl_modem_bdhcp_del_success', { name: self.name }));
        return self;
      }).catch(err => $q.reject(`${$translate.inatant('xdsl_modem_bdhcp_del_error', { name: self.name })}<em>${err.data.message}</em>`)).finally(() => {
        self.busy = false;
      });
  };

  /**
     * Cancel edit mode
     */
  PackXdslModemDhcpBdhcpObject.prototype.cancel = function () {
    this.toggleEdit(false);
    return this.MACAddress;
  };

  /**
     * Enter Edit Mode
     */
  PackXdslModemDhcpBdhcpObject.prototype.edit = function () {
    this.tempValue = pick(this, Object.keys(template));
    this.toggleEdit(true);
  };

  /**
     * Toggle edit mode
     * @param {Boolean} state [Optional] if set, for the edit mode state
     * @return {Boolean} new edit mode state
     */
  PackXdslModemDhcpBdhcpObject.prototype.toggleEdit = function (state) {
    if (isBoolean(state)) {
      this.editMode = state;
    } else {
      this.editMode = !this.editMode;
    }
    return this.editMode;
  };

  return PackXdslModemDhcpBdhcpObject;
});