import React, { useState, useMemo } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import CustomText from './CustomText';
import CustomInput from './CustomInput';
import SignupStepHeader from './SignupStepHeader';
import CustomButton from './CustomButton';
import CustomDropdown from './CustomDropdown';
import { useTheme } from '../Utility/ThemeContext';
import Fonts from '../Utility/Fonts';
import { s, vs, ms } from '../Utility/Scaling';

const STATUS_OPTIONS = [
  { label: '✓ Select status...', value: 'placeholder' },
  { label: '🎖️ Army', value: 'Army' },
  { label: '⚓ Navy', value: 'Navy' },
  { label: '🦅 Marine Corps', value: 'Marine Corps' },
  { label: '✈️ Air Force', value: 'Air Force' },
  { label: '🚀 Space Force', value: 'Space Force' },
  { label: '🔔 Coast Guard', value: 'Coast Guard' },
  { label: '👤 Civilian', value: 'Civilian' },
  { label: '💍 Military Spouse', value: 'Military Spouse' },
];

const INSTALLATION_OPTIONS = [
  { label: '✓ Search or select installation...', value: 'placeholder' },
  { label: 'Fort Liberty (Bragg), NC', value: 'Fort Liberty (Bragg), NC' },
  { label: 'Fort Cavazos (Hood), TX', value: 'Fort Cavazos (Hood), TX' },
  { label: 'Fort Campbell, KY/TN', value: 'Fort Campbell, KY/TN' },
  {
    label: 'Joint Base Lewis-McChord, WA',
    value: 'Joint Base Lewis-McChord, WA',
  },
  { label: 'Camp Pendleton, CA', value: 'Camp Pendleton, CA' },
  { label: 'Camp Lejeune, NC', value: 'Camp Lejeune, NC' },
  { label: 'Naval Station Norfolk, VA', value: 'Naval Station Norfolk, VA' },
  { label: 'Naval Base San Diego, CA', value: 'Naval Base San Diego, CA' },
  { label: 'Enter Civilian Address', value: 'Civilian' },
];

const VEHICLE_TYPE_OPTIONS = [
  { label: '✓ VEHICLE TYPE', value: 'placeholder' },
  {
    label: '⚡ Battery Electric Vehicle (EV)',
    value: 'Battery Electric Vehicle (EV)',
  },
  { label: '🔋 Plug-In Hybrid (PHEV)', value: 'Plug-In Hybrid (PHEV)' },
];

const MAKE_OPTIONS = [
  { label: '✓ Select make...', value: 'placeholder' },
  { label: 'Tesla', value: 'Tesla' },
  { label: 'Rivian', value: 'Rivian' },
  { label: 'Ford', value: 'Ford' },
  { label: 'Chevrolet', value: 'Chevrolet' },
  { label: 'GMC', value: 'GMC' },
  { label: 'Kia', value: 'Kia' },
  { label: 'Hyundai', value: 'Hyundai' },
  { label: 'BMW', value: 'BMW' },
  { label: 'Mercedes-Benz', value: 'Mercedes-Benz' },
  { label: 'Audi', value: 'Audi' },
  { label: 'Porsche', value: 'Porsche' },
  { label: 'Volkswagen', value: 'Volkswagen' },
  { label: 'Nissan', value: 'Nissan' },
  { label: 'Toyota', value: 'Toyota' },
  { label: 'Honda', value: 'Honda' },
  { label: 'Jeep', value: 'Jeep' },
  { label: 'Chrysler', value: 'Chrysler' },
  { label: 'Volvo', value: 'Volvo' },
  { label: 'Polestar', value: 'Polestar' },
  { label: 'Lucid', value: 'Lucid' },
  { label: 'Other', value: 'Other' },
];

const YEAR_OPTIONS = [
  { label: '✓ Year', value: 'placeholder' },
  ...Array.from({ length: 8 }, (_, i) => ({
    label: (2025 - i).toString(),
    value: (2025 - i).toString(),
  })),
];

const StepDetails = ({
  firstName,
  lastName,
  email,
  phone,
  status,
  setStatus,
  installation,
  setInstallation,
  streetAddress,
  setStreetAddress,
  unit,
  setUnit,
  zipCode,
  setZipCode,
  city,
  setCity,
  state,
  setState,
  vehicles,
  setVehicles,
  onNext,
  onBack,
  setIsScrollEnabled,
}) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [errors, setErrors] = useState({});
  const [activeDropdown, setActiveDropdown] = useState(null); // format: { index, field }

  // Disable parent scroll when a dropdown is open
  React.useEffect(() => {
    if (setIsScrollEnabled) {
      setIsScrollEnabled(activeDropdown === null);
    }
  }, [activeDropdown, setIsScrollEnabled]);

  const validate = () => {
    let newErrors = {};

    if (!status) newErrors.status = 'Status is required';
    if (!installation) newErrors.installation = 'Installation is required';
    if (!streetAddress) newErrors.streetAddress = 'Street address is required';
    if (!zipCode) newErrors.zipCode = 'Zip code is required';
    if (!city) newErrors.city = 'City is required';
    if (!state) newErrors.state = 'State is required';

    vehicles.forEach((v, index) => {
      if (!v.vehicleType || v.vehicleType === 'placeholder')
        newErrors[`vType_${index}`] = 'Vehicle type is required';
      if (!v.make || v.make === 'placeholder')
        newErrors[`make_${index}`] = 'Make is required';
      if (!v.year || v.year === 'placeholder')
        newErrors[`year_${index}`] = 'Year is required';
      if (!v.licensePlate)
        newErrors[`plate_${index}`] = 'License plate is required';
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validate()) {
      onNext();
    }
  };

  const updateVehicle = (index, field, value) => {
    const newVehicles = [...vehicles];
    newVehicles[index] = { ...newVehicles[index], [field]: value };
    setVehicles(newVehicles);

    // Clear error
    const errKey =
      field === 'vehicleType'
        ? `vType_${index}`
        : field === 'make'
        ? `make_${index}`
        : field === 'year'
        ? `year_${index}`
        : field === 'licensePlate'
        ? `plate_${index}`
        : null;
    if (errKey && errors[errKey]) {
      setErrors(prev => {
        const newErrs = { ...prev };
        delete newErrs[errKey];
        return newErrs;
      });
    }
  };

  const addVehicle = () => {
    setVehicles([
      ...vehicles,
      {
        id: Date.now(),
        vehicleType: 'placeholder',
        make: 'placeholder',
        model: '',
        year: 'placeholder',
        licensePlate: '',
      },
    ]);
  };

  const removeVehicle = index => {
    if (vehicles.length > 1) {
      const newVehicles = vehicles.filter((_, i) => i !== index);
      setVehicles(newVehicles);
    }
  };

  const handleSelect = (index, field, value) => {
    let options = [];
    if (field === 'status') options = STATUS_OPTIONS;
    if (field === 'installation') options = INSTALLATION_OPTIONS;
    if (field === 'vehicleType') options = VEHICLE_TYPE_OPTIONS;
    if (field === 'make') options = MAKE_OPTIONS;
    if (field === 'year') options = YEAR_OPTIONS;

    const selectedOption = options.find(opt => opt.value === value);
    const displayValue = selectedOption ? selectedOption.label : value;

    if (field === 'status') {
      setStatus(displayValue);
      if (errors.status) {
        setErrors(prev => {
          const newErrs = { ...prev };
          delete newErrs.status;
          return newErrs;
        });
      }
    } else if (field === 'installation') {
      setInstallation(displayValue);
      if (errors.installation) {
        setErrors(prev => {
          const newErrs = { ...prev };
          delete newErrs.installation;
          return newErrs;
        });
      }
    } else {
      updateVehicle(index, field, displayValue);
    }
  };

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.container}>
      <SignupStepHeader
        title="Your details"
        subtitle="Confirm your info and add your address."
      />

      <View style={styles.sectionDivider}>
        <View style={styles.dividerLine} />
        <CustomText
          size={ms(10)}
          font={Fonts.bold}
          color={colors.textSecondary}
          style={styles.dividerLabel}
        >
          ACCOUNT INFO
        </CustomText>
        <View style={styles.dividerLine} />
      </View>

      <View style={styles.nameRow}>
        <View style={{ flex: 1 }}>
          <CustomInput
            label="FIRST NAME"
            value={firstName}
            editable={false}
            rightIcon="🔒"
          />
        </View>
        <View style={{ flex: 1, marginLeft: s(12) }}>
          <CustomInput
            label="LAST NAME"
            value={lastName}
            editable={false}
            rightIcon="🔒"
          />
        </View>
      </View>
      <CustomInput
        label="EMAIL ADDRESS"
        value={email}
        editable={false}
        rightIcon="🔒"
      />
      <CustomInput
        label="PHONE NUMBER"
        value={phone}
        editable={false}
        rightIcon="🔒"
      />

      <View style={styles.sectionDivider}>
        <View style={styles.dividerLine} />
        <CustomText
          size={ms(10)}
          font={Fonts.bold}
          color={colors.textSecondary}
          style={styles.dividerLabel}
        >
          SERVICE STATUS
        </CustomText>
        <View style={styles.dividerLine} />
      </View>

      <View
        style={[
          styles.dropdownContainer,
          { zIndex: activeDropdown?.field === 'status' ? 10 : 5 },
        ]}
      >
        <CustomInput
          label="STATUS"
          placeholder="Select status..."
          value={status}
          isDropdown
          onPress={() =>
            setActiveDropdown(
              activeDropdown?.field === 'status' ? null : { field: 'status' },
            )
          }
          error={errors.status}
        />
        <CustomDropdown
          visible={activeDropdown?.field === 'status'}
          options={STATUS_OPTIONS}
          onSelect={val => {
            handleSelect(null, 'status', val);
            setActiveDropdown(null);
          }}
          selectedValue={status}
        />
      </View>

      <View
        style={[
          styles.dropdownContainer,
          { zIndex: activeDropdown?.field === 'installation' ? 10 : 4 },
        ]}
      >
        <CustomInput
          label="MILITARY INSTALLATION / ADDRESS"
          placeholder="Search or select installation..."
          value={installation}
          isDropdown
          onPress={() =>
            setActiveDropdown(
              activeDropdown?.field === 'installation'
                ? null
                : { field: 'installation' },
            )
          }
          error={errors.installation}
        />
        <CustomDropdown
          visible={activeDropdown?.field === 'installation'}
          options={INSTALLATION_OPTIONS}
          onSelect={val => {
            handleSelect(null, 'installation', val);
            setActiveDropdown(null);
          }}
          selectedValue={installation}
        />
      </View>

      <View style={styles.sectionDivider}>
        <View style={styles.dividerLine} />
        <CustomText
          size={ms(10)}
          font={Fonts.bold}
          color={colors.textSecondary}
          style={styles.dividerLabel}
        >
          RESIDENTIAL ADDRESS
        </CustomText>
        <View style={styles.dividerLine} />
      </View>

      <CustomInput
        label="STREET ADDRESS"
        placeholder="1234 Main Street"
        value={streetAddress}
        onChangeText={val => {
          setStreetAddress(val);
          if (errors.streetAddress)
            setErrors(p => {
              const n = { ...p };
              delete n.streetAddress;
              return n;
            });
        }}
        error={errors.streetAddress}
      />
      <View style={styles.nameRow}>
        <View style={{ flex: 1 }}>
          <CustomInput
            label="UNIT / APT #"
            placeholder="Apt 4B"
            value={unit}
            onChangeText={setUnit}
          />
        </View>
        <View style={{ flex: 1, marginLeft: s(12) }}>
          <CustomInput
            label="ZIP CODE"
            placeholder="28307"
            value={zipCode}
            onChangeText={val => {
              setZipCode(val);
              if (errors.zipCode)
                setErrors(p => {
                  const n = { ...p };
                  delete n.zipCode;
                  return n;
                });
            }}
            keyboardType="numeric"
            error={errors.zipCode}
          />
        </View>
      </View>
      <View style={styles.nameRow}>
        <View style={{ flex: 1 }}>
          <CustomInput
            label="CITY"
            placeholder="Fayetteville"
            value={city}
            onChangeText={val => {
              setCity(val);
              if (errors.city)
                setErrors(p => {
                  const n = { ...p };
                  delete n.city;
                  return n;
                });
            }}
            error={errors.city}
          />
        </View>
        <View style={{ flex: 1, marginLeft: s(12) }}>
          <CustomInput
            label="STATE"
            placeholder="NC"
            value={state}
            onChangeText={val => {
              setState(val);
              if (errors.state)
                setErrors(p => {
                  const n = { ...p };
                  delete n.state;
                  return n;
                });
            }}
            error={errors.state}
          />
        </View>
      </View>

      <View style={styles.sectionDivider}>
        <View style={styles.dividerLine} />
        <CustomText
          size={ms(10)}
          font={Fonts.bold}
          color={colors.textSecondary}
          style={styles.dividerLabel}
        >
          VEHICLE(S)
        </CustomText>
        <View style={styles.dividerLine} />
      </View>

      {vehicles.map((vh, index) => {
        const isPrimary = index === 0;
        return (
          <View key={vh.id} style={styles.vehicleCard}>
            <View style={styles.vehicleCardHeader}>
              <CustomText
                font={Fonts.extraBold}
                size={ms(13)}
                color={colors.textPrimary}
                style={{ letterSpacing: 0.5, flex: 1 }}
              >
                {isPrimary ? '🚗 PRIMARY VEHICLE' : `🏎️ VEHICLE ${index + 1}`}
              </CustomText>

              <View style={styles.headerRight}>
                {(vh.vehicleType.includes('EV') ||
                  vh.vehicleType.includes('PHEV')) && (
                  <View
                    style={[
                      styles.evBadge,
                      {
                        borderColor: vh.vehicleType.includes('EV')
                          ? colors.primary
                          : colors.warning,
                      },
                    ]}
                  >
                    <CustomText
                      font={Fonts.bold}
                      size={ms(10)}
                      color={
                        vh.vehicleType.includes('EV')
                          ? colors.primary
                          : colors.warning
                      }
                    >
                      {vh.vehicleType.includes('EV') ? 'EV' : 'PHEV'}
                    </CustomText>
                  </View>
                )}

                {!isPrimary && (
                  <TouchableOpacity
                    onPress={() => removeVehicle(index)}
                    style={styles.removeBtn}
                  >
                    <CustomText color="#FF4D4D" font={Fonts.bold} size={ms(14)}>
                      ✕
                    </CustomText>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <View
              style={[
                styles.dropdownContainer,
                {
                  zIndex:
                    activeDropdown?.index === index &&
                    activeDropdown?.field === 'vehicleType'
                      ? 10
                      : 3,
                },
              ]}
            >
              <CustomInput
                label="VEHICLE TYPE"
                value={vh.vehicleType}
                isDropdown
                onPress={() =>
                  setActiveDropdown(
                    activeDropdown?.index === index &&
                      activeDropdown?.field === 'vehicleType'
                      ? null
                      : { index, field: 'vehicleType' },
                  )
                }
                error={errors[`vType_${index}`]}
              />
              <CustomDropdown
                visible={
                  activeDropdown?.index === index &&
                  activeDropdown?.field === 'vehicleType'
                }
                options={VEHICLE_TYPE_OPTIONS}
                onSelect={val => {
                  handleSelect(index, 'vehicleType', val);
                  setActiveDropdown(null);
                }}
                selectedValue={vh.vehicleType}
              />
            </View>

            <View style={styles.nameRow}>
              <View
                style={{
                  flex: 1,
                  zIndex:
                    activeDropdown?.index === index &&
                    activeDropdown?.field === 'make'
                      ? 10
                      : 2,
                }}
              >
                <CustomInput
                  label="MAKE"
                  placeholder="Select make..."
                  value={vh.make}
                  isDropdown
                  onPress={() =>
                    setActiveDropdown(
                      activeDropdown?.index === index &&
                        activeDropdown?.field === 'make'
                        ? null
                        : { index, field: 'make' },
                    )
                  }
                  error={errors[`make_${index}`]}
                />
                <CustomDropdown
                  visible={
                    activeDropdown?.index === index &&
                    activeDropdown?.field === 'make'
                  }
                  options={MAKE_OPTIONS}
                  onSelect={val => {
                    handleSelect(index, 'make', val);
                    setActiveDropdown(null);
                  }}
                  selectedValue={vh.make}
                />
              </View>
              <View style={{ flex: 1, marginLeft: s(12) }}>
                <CustomInput
                  label="MODEL"
                  placeholder="Select model..."
                  value={vh.model}
                  onChangeText={val => {
                    updateVehicle(index, 'model', val);
                  }}
                  error={errors[`model_${index}`]}
                />
              </View>
            </View>

            <View style={styles.nameRow}>
              <View
                style={{
                  flex: 1,
                  zIndex:
                    activeDropdown?.index === index &&
                    activeDropdown?.field === 'year'
                      ? 10
                      : 1,
                }}
              >
                <CustomInput
                  label="YEAR"
                  placeholder="Year"
                  value={vh.year}
                  isDropdown
                  onPress={() =>
                    setActiveDropdown(
                      activeDropdown?.index === index &&
                        activeDropdown?.field === 'year'
                        ? null
                        : { index, field: 'year' },
                    )
                  }
                  error={errors[`year_${index}`]}
                />
                <CustomDropdown
                  visible={
                    activeDropdown?.index === index &&
                    activeDropdown?.field === 'year'
                  }
                  options={YEAR_OPTIONS}
                  onSelect={val => {
                    handleSelect(index, 'year', val);
                    setActiveDropdown(null);
                  }}
                  selectedValue={vh.year}
                />
              </View>
              <View style={{ flex: 1, marginLeft: s(12) }}>
                <CustomInput
                  label="LICENSE PLATE"
                  placeholder="TRO-0001"
                  value={vh.licensePlate}
                  onChangeText={val => {
                    updateVehicle(index, 'licensePlate', val);
                  }}
                  error={errors[`plate_${index}`]}
                />
              </View>
            </View>
          </View>
        );
      })}

      <TouchableOpacity style={styles.addVehicleBtn} onPress={addVehicle}>
        <CustomText font={Fonts.bold} size={ms(14)} color={colors.textPrimary}>
          + Add Another Vehicle
        </CustomText>
      </TouchableOpacity>

      <CustomButton
        title="Continue →"
        backgroundColor={colors.primary}
        titleColor={colors.textOnPrimary}
        size="lg"
        fullWidth
        onPress={handleContinue}
        style={styles.ctaBtn}
        titleFont={Fonts.extraBold}
      />

      <CustomButton
        title="← Back"
        backgroundColor="transparent"
        borderColor={colors.border}
        borderWidth={1.5}
        titleColor={colors.textPrimary}
        size="lg"
        fullWidth
        onPress={onBack}
        style={styles.backBtn}
        titleFont={Fonts.bold}
      />
    </Animated.View>
  );
};

const createStyles = colors =>
  StyleSheet.create({
    container: {
      width: '100%',
    },
    dropdownContainer: {
      position: 'relative',
    },
    nameRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: vs(4),
    },
    sectionDivider: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: vs(20),
      marginBottom: vs(12),
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: colors.border,
    },
    dividerLabel: {
      paddingHorizontal: s(12),
      letterSpacing: 1.2,
    },
    vehicleCard: {
      backgroundColor: colors.card,
      borderRadius: ms(24),
      padding: s(20),
      borderWidth: 1.5,
      borderColor: colors.border,
      marginBottom: vs(16),
    },
    vehicleCardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: vs(20),
    },
    headerRight: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    removeBtn: {
      width: ms(28),
      height: ms(28),
      borderRadius: ms(8),
      backgroundColor: 'rgba(255, 77, 77, 0.1)',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: s(12),
      borderWidth: 1,
      borderColor: 'rgba(255, 77, 77, 0.2)',
    },
    evBadge: {
      paddingHorizontal: s(12),
      paddingVertical: vs(4),
      borderRadius: ms(10),
      borderWidth: 1.5,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    addVehicleBtn: {
      width: '100%',
      height: vs(50),
      borderRadius: ms(16),
      borderWidth: 1.5,
      borderStyle: 'dashed',
      borderColor: colors.border,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: vs(4),
      marginBottom: vs(20),
    },
    ctaBtn: {
      marginTop: vs(24),
      height: vs(42),
      borderRadius: ms(12),
    },
    backBtn: {
      marginTop: vs(12),
      height: vs(42),
      borderRadius: ms(12),
    },
  });

export default StepDetails;
