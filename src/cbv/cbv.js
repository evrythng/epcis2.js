/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

/**
 * An object containing all the possible bizSteps
 * More info here: https://www.gs1.org/standards/epcis
 */
export const bizSteps = {
  accepting: 'urn:epcglobal:cbv:bizstep:accepting',
  arriving: 'urn:epcglobal:cbv:bizstep:arriving',
  assembling: 'urn:epcglobal:cbv:bizstep:assembling',
  collecting: 'urn:epcglobal:cbv:bizstep:collecting',
  commissioning: 'urn:epcglobal:cbv:bizstep:commissioning',
  consigning: 'urn:epcglobal:cbv:bizstep:consigning',
  creating_class_instance: 'urn:epcglobal:cbv:bizstep:creating_class_instance',
  cycle_counting: 'urn:epcglobal:cbv:bizstep:cycle_counting',
  decommissioning: 'urn:epcglobal:cbv:bizstep:decommissioning',
  departing: 'urn:epcglobal:cbv:bizstep:departing',
  destroying: 'urn:epcglobal:cbv:bizstep:destroying',
  disassembling: 'urn:epcglobal:cbv:bizstep:disassembling',
  dispensing: 'urn:epcglobal:cbv:bizstep:dispensing',
  encoding: 'urn:epcglobal:cbv:bizstep:encoding',
  entering_exiting: 'urn:epcglobal:cbv:bizstep:entering_exiting',
  holding: 'urn:epcglobal:cbv:bizstep:holding',
  inspecting: 'urn:epcglobal:cbv:bizstep:inspecting',
  installing: 'urn:epcglobal:cbv:bizstep:installing',
  killing: 'urn:epcglobal:cbv:bizstep:killing',
  loading: 'urn:epcglobal:cbv:bizstep:loading',
  other: 'urn:epcglobal:cbv:bizstep:other',
  packing: 'urn:epcglobal:cbv:bizstep:packing',
  picking: 'urn:epcglobal:cbv:bizstep:picking',
  receiving: 'urn:epcglobal:cbv:bizstep:receiving',
  removing: 'urn:epcglobal:cbv:bizstep:removing',
  repackaging: 'urn:epcglobal:cbv:bizstep:repackaging',
  repairing: 'urn:epcglobal:cbv:bizstep:repairing',
  replacing: 'urn:epcglobal:cbv:bizstep:replacing',
  reserving: 'urn:epcglobal:cbv:bizstep:reserving',
  retail_selling: 'urn:epcglobal:cbv:bizstep:retail_selling',
  sampling: 'urn:epcglobal:cbv:bizstep:sampling',
  sensor_reporting: 'urn:epcglobal:cbv:bizstep:sensor_reporting',
  shipping: 'urn:epcglobal:cbv:bizstep:shipping',
  staging_outbound: 'urn:epcglobal:cbv:bizstep:staging_outbound',
  stock_taking: 'urn:epcglobal:cbv:bizstep:stock_taking',
  stocking: 'urn:epcglobal:cbv:bizstep:stocking',
  storing: 'urn:epcglobal:cbv:bizstep:storing',
  transporting: 'urn:epcglobal:cbv:bizstep:transporting',
  unloading: 'urn:epcglobal:cbv:bizstep:unloading',
  unpacking: 'urn:epcglobal:cbv:bizstep:unpacking',
  void_shipping: 'urn:epcglobal:cbv:bizstep:void_shipping',
};

/**
 * An object containing all the possible dispositions
 * More info here: https://www.gs1.org/standards/epcis
 */
export const dispositions = {
  active: 'urn:epcglobal:cbv:disp:active',
  available: 'urn:epcglobal:cbv:disp:available',
  completeness_verified: 'urn:epcglobal:cbv:disp:completeness_verified',
  completeness_inferred: 'urn:epcglobal:cbv:disp:completeness_inferred',
  conformant: 'urn:epcglobal:cbv:disp:conformant',
  container_closed: 'urn:epcglobal:cbv:disp:container_closed',
  container_open: 'urn:epcglobal:cbv:disp:container_open',
  damaged: 'urn:epcglobal:cbv:disp:damaged',
  destroyed: 'urn:epcglobal:cbv:disp:destroyed',
  dispensed: 'urn:epcglobal:cbv:disp:dispensed',
  disposed: 'urn:epcglobal:cbv:disp:disposed',
  encoded: 'urn:epcglobal:cbv:disp:encoded',
  expired: 'urn:epcglobal:cbv:disp:expired',
  in_progress: 'urn:epcglobal:cbv:disp:in_progress',
  in_transit: 'urn:epcglobal:cbv:disp:in_transit',
  inactive: 'urn:epcglobal:cbv:disp:inactive',
  mismatch_instance: 'urn:epcglobal:cbv:disp:mismatch_instance',
  mismatch_class: 'urn:epcglobal:cbv:disp:mismatch_class',
  mismatch_quantity: 'urn:epcglobal:cbv:disp:mismatch_quantity',
  needs_replacement: 'urn:epcglobal:cbv:disp:needs_replacement',
  non_conformant: 'urn:epcglobal:cbv:disp:non_conformant',
  non_sellable_other: 'urn:epcglobal:cbv:disp:non_sellable_other',
  partially_dispensed: 'urn:epcglobal:cbv:disp:partially_dispensed',
  recalled: 'urn:epcglobal:cbv:disp:recalled',
  reserved: 'urn:epcglobal:cbv:disp:reserved',
  retail_sold: 'urn:epcglobal:cbv:disp:retail_sold',
  returned: 'urn:epcglobal:cbv:disp:returned',
  sellable_accessible: 'urn:epcglobal:cbv:disp:sellable_accessible',
  sellable_not_accessible: 'urn:epcglobal:cbv:disp:sellable_not_accessible',
  stolen: 'urn:epcglobal:cbv:disp:stolen',
  unavailable: 'urn:epcglobal:cbv:disp:unavailable',
  unknown: 'urn:epcglobal:cbv:disp:unknown',
};

/**
 * An object containing all the possible businessTransactionTypes
 * More info here: https://www.gs1.org/standards/epcis
 */
export const businessTransactionTypes = {
  bol: 'urn:epcglobal:cbv:btt:bol',
  cert: 'urn:epcglobal:cbv:btt:cert',
  desadv: 'urn:epcglobal:cbv:btt:desadv',
  inv: 'urn:epcglobal:cbv:btt:inv',
  pedigree: 'urn:epcglobal:cbv:btt:pedigree',
  po: 'urn:epcglobal:cbv:btt:po',
  poc: 'urn:epcglobal:cbv:btt:poc',
  prodorder: 'urn:epcglobal:cbv:btt:prodorder',
  recadv: 'urn:epcglobal:cbv:btt:recadv',
  rma: 'urn:epcglobal:cbv:btt:rma',
  testprd: 'urn:epcglobal:cbv:btt:testprd',
  testres: 'urn:epcglobal:cbv:btt:testres',
  upevt: 'urn:epcglobal:cbv:btt:upevt',
};

/**
 * An object containing all the possible sourceDestinationTypes
 * More info here: https://www.gs1.org/standards/epcis
 */
export const sourceDestinationTypes = {
  owning_party: 'urn:epcglobal:cbv:sdt:owning_party',
  possessing_party: 'urn:epcglobal:cbv:sdt:possessing_party',
  location: 'urn:epcglobal:cbv:sdt:location',
};

/**
 * An object containing all the possible errorReasonIdentifiers
 * More info here: https://www.gs1.org/standards/epcis
 */
export const errorReasonIdentifiers = {
  did_not_occur: 'urn:epcglobal:cbv:er:did_not_occur',
  incorrect_data: 'urn:epcglobal:cbv:er:incorrect_data',
};

/**
 * An object containing all the possible sensorMeasurementTypes
 * More info here: https://www.gs1.org/standards/epcis
 */
export const sensorMeasurementTypes = {
  absorbed_dose: 'gs1:MT-Absorbed_dose',
  absorbed_dose_rate: 'gs1:MT-Absorbed_dose_rate',
  acceleration: 'gs1:MT-Acceleration',
  altitude: 'gs1:MT-Acceleration',
  elevation: 'gs1:MT-Acceleration',
  amount_of_substance: 'gs1:MT-Amount_of_substance',
  angle: 'gs1:MT-Angle',
  angular_impulse: 'gs1:MT-Angular impulse',
  angular_momentum: 'gs1:MT-Angular momentum',
  area: 'gs1:MT-Area',
  capacitance: 'gs1:MT-Capacitance',
  charge: 'gs1:MT-Charge',
  conductance: 'gs1:MT-Conductance',
  conductivity: 'gs1:MT-Conductivity',
  count: 'gs1:MT-Count',
  current: 'gs1:MT-Current',
  current_density: 'gs1:MT-Current density',
  density: 'gs1:MT-Density',
  dimensionless_concentration: 'gs1:MT-Dimensionless_concentration',
  dynamic_viscosity: 'gs1:MT-Dynamic_viscosity',
  effective_dose: 'gs1:MT-Effective_dose',
  equivalent_dose: 'gs1:MT-Equivalent_dose',
  effective_dose_rate: 'gs1:MT-Effective_dose_rate',
  electric_field_intensity: 'gs1:MT-Electric_field_intensity',
  energy: 'gs1:MT-Energy',
  exposure: 'gs1:MT-Exposure',
  force: 'gs1:MT-Force',
  frequency: 'gs1:MT-Frequency',
  humidity: 'gs1:MT-Humidity',
  illuminance: 'gs1:MT-Illuminance',
  impulse_or_linear_momentum: 'gs1:MT-Impulse or linear momentum',
  inductance: 'gs1:MT-Inductance',
  irradiance: 'gs1:MT-Irradiance',
  kinematic_viscosity: 'gs1:MT-Kinematic_viscosity',
  latitude: 'gs1:MT-Latitude',
  length: 'gs1:MT-Length',
  longitude: 'gs1:MT-Longitude',
  luminous_flux: 'gs1:MT-Luminous_flux',
  luminous_intensity: 'gs1:MT-Luminous_intensity',
  magnetic_flux: 'gs1:MT-Magnetic_flux',
  magnetic_flux_density: 'gs1:MT-Magnetic_flux_density',
  magnetic_vector_potential: 'gs1:MT-Magnetic_vector_potential',
  mass: 'gs1:MT-Mass',
  mass_flow_rate: 'gs1:MT-Mass_flow_rate',
  mass_flux: 'gs1:MT-Mass_flux',
  memory_capacity: 'gs1:MT-Memory_capacity',
  molar_concentration: 'gs1:MT-Molar_concentration',
  molar_mass: 'gs1:MT-Molar_mass',
  molar_thermodynamic_energy: 'gs1:MT-Molar_thermodynamic_energy',
  molar_volume: 'gs1:MT-Molar_volume',
  power: 'gs1:MT-Power',
  pressure: 'gs1:MT-Pressure',
  radiant_flux: 'gs1:MT-Radiant_flux',
  radiant_intensity: 'gs1:MT-Radiant_intensity',
  radioactivity: 'gs1:MT-Radioactivity',
  resistance: 'gs1:MT-Resistance',
  resistivity: 'gs1:MT-Resistivity',
  specific_volume: 'gs1:MT-Specific_volume',
  speed: 'gs1:MT-Speed',
  velocity: 'gs1:MT-Velocity',
  temperature: 'gs1:MT-Temperature',
  time: 'gs1:MT-Time',
  torque: 'gs1:MT-Torque',
  voltage: 'gs1:MT-Voltage',
  volume: 'gs1:MT-Volume',
  volumetric_flow_rate: 'gs1:MT-Volumetric_flow_rate',
  volumetric_flux: 'gs1:MT-Volumetric_flux',
};

/**
 * An object containing all the possible alarmTypes
 * More info here: https://www.gs1.org/standards/epcis
 */
export const alarmTypes = {
  alarm_condition: 'gs1:AT-Alarm_condition',
  error_condition: 'gs1:AT-Error_condition',
};

/**
 * An object containing all the possible action
 * More info here: https://www.gs1.org/standards/epcis
 */
export const actionTypes = {
  observe: 'OBSERVE',
  add: 'ADD',
  delete: 'DELETE',
};
