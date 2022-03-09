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
  accepting: 'accepting',
  arriving: 'arriving',
  assembling: 'assembling',
  collecting: 'collecting',
  commissioning: 'commissioning',
  consigning: 'consigning',
  creating_class_instance: 'creating_class_instance',
  cycle_counting: 'cycle_counting',
  decommissioning: 'decommissioning',
  departing: 'departing',
  destroying: 'destroying',
  disassembling: 'disassembling',
  dispensing: 'dispensing',
  encoding: 'encoding',
  entering_exiting: 'entering_exiting',
  holding: 'holding',
  inspecting: 'inspecting',
  installing: 'installing',
  killing: 'killing',
  loading: 'loading',
  other: 'other',
  packing: 'packing',
  picking: 'picking',
  receiving: 'receiving',
  removing: 'removing',
  repackaging: 'repackaging',
  repairing: 'repairing',
  replacing: 'replacing',
  reserving: 'reserving',
  retail_selling: 'retail_selling',
  sampling: 'sampling',
  sensor_reporting: 'sensor_reporting',
  shipping: 'shipping',
  staging_outbound: 'staging_outbound',
  stock_taking: 'stock_taking',
  stocking: 'stocking',
  storing: 'storing',
  transporting: 'transporting',
  unloading: 'unloading',
  unpacking: 'unpacking',
  void_shipping: 'void_shipping',
};

/**
 * An object containing all the possible dispositions
 * More info here: https://www.gs1.org/standards/epcis
 */
export const dispositions = {
  active: 'active',
  available: 'available',
  completeness_verified: 'completeness_inferred',
  completeness_inferred: 'completeness_verified',
  conformant: 'conformant',
  container_closed: 'container_closed',
  container_open: 'container_open',
  damaged: 'damaged',
  destroyed: 'destroyed',
  dispensed: 'dispensed',
  disposed: 'disposed',
  encoded: 'encoded',
  expired: 'expired',
  in_progress: 'in_progress',
  in_transit: 'in_transit',
  inactive: 'inactive',
  mismatch_instance: 'mismatch_instance',
  mismatch_class: 'mismatch_class',
  mismatch_quantity: 'mismatch_quantity',
  needs_replacement: 'needs_replacement',
  no_pedigree_match: 'no_pedigree_match',
  non_conformant: 'non_conformant',
  non_sellable_other: 'non_sellable_other',
  partially_dispensed: 'partially_dispensed',
  recalled: 'recalled',
  reserved: 'reserved',
  retail_sold: 'retail_sold',
  returned: 'returned',
  sellable_accessible: 'sellable_accessible',
  sellable_not_accessible: 'sellable_not_accessible',
  stolen: 'stolen',
  unavailable: 'unavailable',
  unknown: 'unknown',
};

/**
 * An object containing all the possible businessTransactionTypes
 * More info here: https://www.gs1.org/standards/epcis
 */
export const businessTransactionTypes = {
  bol: 'bol',
  cert: 'cert',
  desadv: 'desadv',
  inv: 'inv',
  pedigree: 'pedigree',
  po: 'po',
  poc: 'poc',
  prodorder: 'prodorder',
  recadv: 'recadv',
  rma: 'rma',
  testprd: 'testprd',
  testres: 'testres',
  upevt: 'upevt',
};

/**
 * An object containing all the possible sourceDestinationTypes
 * More info here: https://www.gs1.org/standards/epcis
 */
export const sourceDestinationTypes = {
  owning_party: 'owning_party',
  possessing_party: 'possessing_party',
  location: 'location',
};

/**
 * An object containing all the possible errorReasonIdentifiers
 * More info here: https://www.gs1.org/standards/epcis
 */
export const errorReasonIdentifiers = {
  did_not_occur: 'did_not_occur',
  incorrect_data: 'incorrect_data',
};

/**
 * An object containing all the possible sensorMeasurementTypes
 * More info here: https://www.gs1.org/standards/epcis
 */
export const sensorMeasurementTypes = {
  absolute_humidity: 'AbsoluteHumidity',
  absorbed_dose: 'AbsorbedDose',
  absorbed_dose_rate: 'AbsorbedDoseRate',
  acceleration: 'Acceleration',
  activity: 'Activity',
  altitude: 'Altitude',
  amount_of_substance: 'AmountOfSubstance',
  amount_of_substance_per_unit_volume: 'AmountOfSubstancePerUnitVolume',
  angle: 'Angle',
  angular_acceleration: 'AngularAcceleration',
  angular_momentum: 'AngularMomentum',
  angular_velocity: 'AngularVelocity',
  area: 'Area',
  capacitance: 'Capacitance',
  conductance: 'Conductance',
  conductivity: 'Conductivity',
  count: 'Count',
  density: 'Density',
  dimensionless: 'Dimensionless',
  dose_equivalent: 'DoseEquivalent',
  dose_equivalent_rate: 'DoseEquivalentRate',
  dynamic_viscosity: 'DynamicViscosity',
  electric_charge: 'ElectricCharge',
  electric_current: 'ElectricCurrent',
  electric_current_density: 'ElectricCurrentDensity',
  electric_field_strength: 'ElectricFieldStrength',
  energy: 'Energy',
  exposure: 'Exposure',
  force: 'Force',
  frequency: 'Frequency',
  illuminance: 'Illuminance',
  inductance: 'Inductance',
  irradiance: 'Irradiance',
  kinematic_viscosity: 'KinematicViscosity',
  length: 'Length',
  linear_momentum: 'LinearMomentum',
  luminance: 'Luminance',
  luminous_flux: 'LuminousFlux',
  luminous_intensity: 'LuminousIntensity',
  magnetic_flux: 'MagneticFlux',
  magnetic_flux_density: 'MagneticFluxDensity',
  magnetic_vector_potential: 'MagneticVectorPotential',
  mass: 'Mass',
  mass_concentration: 'MassConcentration',
  mass_flow_rate: 'MassFlowRate',
  mass_per_area_time: 'MassPerAreaTime',
  memory_capacity: 'MemoryCapacity',
  molality_of_solute: 'MolalityOfSolute',
  molar_energy: 'MolarEnergy',
  molar_mass: 'MolarMass',
  molar_volume: 'MolarVolume',
  power: 'Power',
  pressure: 'Pressure',
  radiant_flux: 'RadiantFlux',
  radiant_intensity: 'RadiantIntensity',
  relative_humidity: 'RelativeHumidity',
  resistance: 'Resistance',
  resistivity: 'Resistivity',
  solid_angle: 'SolidAngle',
  specific_volume: 'SpecificVolume',
  speed: 'Speed',
  surface_density: 'SurfaceDensity',
  surface_tension: 'SurfaceTension',
  temperature: 'Temperature',
  time: 'Time',
  torque: 'Torque',
  voltage: 'Voltage',
  volume: 'Volume',
  volume_flow_rate: 'VolumeFlowRate',
  volume_fraction: 'VolumeFraction',
  volumetric_flux: 'VolumetricFlux',
  wave_number: 'Wavenumber',
};

/**
 * An object containing all the possible alarmTypes
 * More info here: https://www.gs1.org/standards/epcis
 */
export const alarmTypes = {
  alarm_condition: 'ALARM_CONDITION',
  error_condition: 'ERROR_CONDITION',
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

/**
 * An object containing all the possible components
 * More info here: https://www.gs1.org/standards/epcis
 */
export const components = {
  x: 'x',
  y: 'y',
  z: 'z',
  axial_distance: 'axial_distance',
  azimuth: 'azimuth',
  height: 'height',
  spherical_radius: 'spherical_radius',
  polar_angle: 'polar_angle',
  elevation_angle: 'elevation_angle',
  easting: 'easting',
  northing: 'northing',
  latitude: 'latitude',
  longitude: 'longitude',
  altitude: 'altitude',
};
