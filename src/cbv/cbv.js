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
  Absorbed_dose: 'gs1:MT-Absorbed_dose',
  Absorbed_dose_rate: 'gs1:MT-Absorbed_dose_rate',
  Acceleration: 'gs1:MT-Acceleration',
  Altitude: 'gs1:MT-Acceleration',
  Elevation: 'gs1:MT-Acceleration',
  Amount_of_substance: 'gs1:MT-Amount_of_substance',
  Angle: 'gs1:MT-Angle',
  Angular_impulse: 'gs1:MT-Angular impulse',
  Angular_momentum: 'gs1:MT-Angular momentum',
  Area: 'gs1:MT-Area',
  Capacitance: 'gs1:MT-Capacitance',
  Charge: 'gs1:MT-Charge',
  Conductance: 'gs1:MT-Conductance',
  Conductivity: 'gs1:MT-Conductivity',
  Count: 'gs1:MT-Count',
  Current: 'gs1:MT-Current',
  Current_density: 'gs1:MT-Current density',
  Density: 'gs1:MT-Density',
  Dimensionless_concentration: 'gs1:MT-Dimensionless_concentration',
  Dynamic_viscosity: 'gs1:MT-Dynamic_viscosity',
  Effective_dose: 'gs1:MT-Effective_dose',
  Equivalent_dose: 'gs1:MT-Equivalent_dose',
  Effective_dose_rate: 'gs1:MT-Effective_dose_rate',
  Electric_field_intensity: 'gs1:MT-Electric_field_intensity',
  Energy: 'gs1:MT-Energy',
  Exposure: 'gs1:MT-Exposure',
  Force: 'gs1:MT-Force',
  Frequency: 'gs1:MT-Frequency',
  Humidity: 'gs1:MT-Humidity',
  Illuminance: 'gs1:MT-Illuminance',
  Impulse_or_linear_momentum: 'gs1:MT-Impulse or linear momentum',
  Inductance: 'gs1:MT-Inductance',
  Irradiance: 'gs1:MT-Irradiance',
  Kinematic_viscosity: 'gs1:MT-Kinematic_viscosity',
  Latitude: 'gs1:MT-Latitude',
  Length: 'gs1:MT-Length',
  Longitude: 'gs1:MT-Longitude',
  Luminous_flux: 'gs1:MT-Luminous_flux',
  Luminous_intensity: 'gs1:MT-Luminous_intensity',
  Magnetic_flux: 'gs1:MT-Magnetic_flux',
  Magnetic_flux_density: 'gs1:MT-Magnetic_flux_density',
  Magnetic_vector_potential: 'gs1:MT-Magnetic_vector_potential',
  Mass: 'gs1:MT-Mass',
  Mass_flow_rate: 'gs1:MT-Mass_flow_rate',
  Mass_flux: 'gs1:MT-Mass_flux',
  Memory_capacity: 'gs1:MT-Memory_capacity',
  Molar_concentration: 'gs1:MT-Molar_concentration',
  Molar_mass: 'gs1:MT-Molar_mass',
  Molar_thermodynamic_energy: 'gs1:MT-Molar_thermodynamic_energy',
  Molar_volume: 'gs1:MT-Molar_volume',
  Power: 'gs1:MT-Power',
  Pressure: 'gs1:MT-Pressure',
  Radiant_flux: 'gs1:MT-Radiant_flux',
  Radiant_intensity: 'gs1:MT-Radiant_intensity',
  Radioactivity: 'gs1:MT-Radioactivity',
  Resistance: 'gs1:MT-Resistance',
  Resistivity: 'gs1:MT-Resistivity',
  Specific_volume: 'gs1:MT-Specific_volume',
  Speed: 'gs1:MT-Speed',
  Velocity: 'gs1:MT-Velocity',
  Temperature: 'gs1:MT-Temperature',
  Time: 'gs1:MT-Time',
  Torque: 'gs1:MT-Torque',
  Voltage: 'gs1:MT-Voltage',
  Volume: 'gs1:MT-Volume',
  Volumetric_flow_rate: 'gs1:MT-Volumetric_flow_rate',
  Volumetric_flux: 'gs1:MT-Volumetric_flux',
};

/**
 * An object containing all the possible alarmTypes
 * More info here: https://www.gs1.org/standards/epcis
 */
export const alarmTypes = {
  Alarm_condition: 'gs1:AT-Alarm_condition',
  Error_condition: 'gs1:AT-Error_condition',
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
