import React, { useMemo } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
} from 'react-native';
import CustomText from './CustomText';
import { useTheme } from '../Utility/ThemeContext';
import Fonts from '../Utility/Fonts';
import { s, vs, ms } from '../Utility/Scaling';

const CustomDropdown = ({
  visible,
  options,
  onSelect,
  selectedValue,
}) => {
  const { colors, theme } = useTheme();
  const styles = useMemo(() => createStyles(colors, theme), [colors, theme]);
  const animatedOpacity = React.useRef(new Animated.Value(0)).current;
  const [shouldRender, setShouldRender] = React.useState(visible);

  React.useEffect(() => {
    if (visible) {
      setShouldRender(true);
      Animated.timing(animatedOpacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setShouldRender(false);
      });
    }
  }, [visible]);

  const handleSelect = (item) => {
    onSelect(item.value);
  };

  if (!shouldRender) return null;

  return (
    <Animated.View 
      style={[
        styles.container, 
        { 
          opacity: animatedOpacity,
          transform: [{ translateY: animatedOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: [-10, 0],
          }) }]
        }
      ]}
      pointerEvents={visible ? 'auto' : 'none'}
    >
      <View style={styles.listContainer}>
        {options.map((item, index) => {
          const isSelected = selectedValue === item.value || selectedValue === item.label;
          const isPlaceholder = item.value === 'placeholder' || item.label.includes('✓');

          if (isPlaceholder) return null;

          return (
            <TouchableOpacity
              key={item.value + index}
              style={[
                styles.optionItem,
                isSelected && styles.optionItemActive,
              ]}
              onPress={() => handleSelect(item)}
              activeOpacity={0.7}
            >
              <View style={styles.optionRow}>
                <View style={styles.checkContainer}>
                  {isSelected && (
                    <CustomText 
                      style={styles.checkIcon}
                      color={colors.textOnPrimary}
                    >✓</CustomText>
                  )}
                </View>
                <CustomText
                  font={isSelected ? Fonts.bold : Fonts.medium}
                  size={ms(14)}
                  color={isSelected ? colors.textOnPrimary : colors.textPrimary}
                  style={{ flex: 1 }}
                >
                  {item.label}
                </CustomText>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </Animated.View>
  );
};

const createStyles = (colors, theme) => StyleSheet.create({
  container: {
    backgroundColor: theme === 'dark' ? colors.card : '#F8F9FA',
    borderRadius: ms(16),
    borderWidth: 1.5,
    borderColor: colors.border,
    marginTop: -vs(10),
    marginBottom: vs(16),
    overflow: 'hidden',
  },
  listContainer: {
    padding: s(6),
  },
  optionItem: {
    paddingVertical: vs(12),
    paddingHorizontal: s(12),
    borderRadius: ms(12),
    marginBottom: vs(2),
  },
  optionItemActive: {
    backgroundColor: colors.primary,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  checkContainer: {
    width: s(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkIcon: {
    fontSize: ms(16),
    fontWeight: '900',
  },
});

export default CustomDropdown;
