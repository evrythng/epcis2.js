import Entity from '../Entity';
import EPCISMasterData from './EPCISMasterData';

export default class EPCISHeader extends Entity {
  /**
   * You can either create an empty EPCISHeader or provide an already existing EPCISHeader
   * via Map
   * @param {Object} [epcisHeader] - The Map that will be used to create the epcisHeader entity
   */
  constructor(epcisHeader) {
    super(epcisHeader);

    if (!epcisHeader) {
      return;
    }

    // Create classes for sub-objects that are provided
    Object.entries(epcisHeader).forEach(([key, value]) => {
      if (key === 'epcisMasterData') {
        this.setEPCISMasterData(new EPCISMasterData(value));
      }
    });
  }

  /**
   * Set the epcisMasterData property
   * @param {EPCISMasterData} epcisMasterData
   * @return {EPCISHeader} - the epcisHeader instance
   */
  setEPCISMasterData(epcisMasterData) {
    this.epcisMasterData = epcisMasterData;
    return this;
  }

  /**
   * Getter for the epcisMasterData property
   * @return {EPCISMasterData} - the epcisMasterData
   */
  getEPCISMasterData() {
    return this.epcisMasterData;
  }
}
