import React, { useEffect, useRef, useMemo } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
  Animated,
  Easing,
  Dimensions,
  PanResponder,
} from 'react-native';
import CustomText from '../../../Component/CustomText';
import CustomButton from '../../../Component/CustomButton';
import Fonts from '../../../Utility/Fonts';
import createStyles from './HomeStyles';
import { useTheme } from '../../../Utility/ThemeContext';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const SkinsModal = ({
  visible,
  onClose,
  skins,
  equippedSkin,
  setEquippedSkin,
}) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  // PanResponder to handle swipe-to-dismiss gesture
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gesture) => {
        // Only respond to vertical movement
        return Math.abs(gesture.dy) > 5;
      },
      onPanResponderMove: (_, gesture) => {
        // Only allow dragging downwards (positive dy)
        if (gesture.dy > 0) {
          translateY.setValue(gesture.dy);
        }
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy > 120 || gesture.vy > 0.5) {
          // If dragged down far enough or fast enough, close the modal
          handleClose();
        } else {
          // Snap back to open position
          Animated.spring(translateY, {
            toValue: 0,
            friction: 8,
            tension: 40,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 400,
          easing: Easing.out(Easing.back(0.5)),
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      translateY.setValue(SCREEN_HEIGHT);
      opacity.setValue(0);
    }
  }, [visible]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        duration: 300,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
    >
      <Animated.View style={[styles.skinsModalContainer, { opacity: opacity }]}>
        <TouchableOpacity
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          activeOpacity={1}
          onPress={handleClose}
        />
        <Animated.View
          style={[
            styles.skinsModalContent,
            {
              transform: [{ translateY: translateY }],
            },
          ]}
        >
          {/* Interaction Area for Swiping */}
          <View
            style={{ width: '100%', flexShrink: 1 }}
            onStartShouldSetResponder={() => false} // Let children handle touches by default
          >
            {/* Gesture Detector Area (Handle + Header) */}
            <View {...panResponder.panHandlers} style={{ width: '100%' }}>
              <View style={styles.smHandle} />
              <View style={styles.skinsModalHeader}>
                <View>
                  <CustomText
                    size={20}
                    color={colors.textPrimary}
                    font={Fonts.extraBold}
                    style={{ marginBottom: 4 }}
                  >
                    🎨 EV Skins
                  </CustomText>
                  <CustomText size={13} color={colors.textSecondary} font={Fonts.medium}>
                    Customize your ride. Tap to equip or unlock.
                  </CustomText>
                </View>
              </View>
            </View>

            <ScrollView
              contentContainerStyle={styles.skinsGrid}
              showsVerticalScrollIndicator={false}
              overScrollMode="never"
              bounces={true}
              nestedScrollEnabled={true}
            >
              {skins?.map(skin => {
                const isActive = equippedSkin.id === skin.id;
                return (
                  <TouchableOpacity
                    key={skin.id}
                    style={[
                      styles.skinOption,
                      isActive && styles.skinOptionActive,
                      skin.premium && styles.skinOptionPremium,
                    ]}
                    onPress={() => {
                      if (!skin.locked) setEquippedSkin(skin);
                    }}
                  >
                    <CustomText size={36} style={styles.skinEmoji}>
                      {skin.emoji}
                    </CustomText>
                    <CustomText
                      size={13}
                      font={Fonts.bold}
                      color={colors.textPrimary}
                      style={styles.skinName}
                    >
                      {skin.name}
                    </CustomText>

                    <CustomText
                      size={11}
                      font={Fonts.bold}
                      color={
                        isActive
                          ? colors.success
                          : skin.locked
                          ? colors.error
                          : skin.premium
                          ? colors.warning
                          : colors.success
                      }
                    >
                      {isActive ? 'Equipped' : skin.status}
                    </CustomText>

                    {isActive && (
                      <CustomText
                        size={10}
                        color={colors.success}
                        font={Fonts.bold}
                        style={{ marginTop: 4 }}
                      >
                        ✓ Active
                      </CustomText>
                    )}
                    {!isActive && skin.sub && (
                      <CustomText
                        size={9}
                        color={
                          skin.premium
                            ? colors.warning
                            : colors.textSecondary
                        }
                        style={{ marginTop: 2 }}
                      >
                        {skin.sub}
                      </CustomText>
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <CustomButton
              title="Done"
              onPress={handleClose}
              backgroundColor={colors.primary}
              titleColor={colors.textOnPrimary}
              style={styles.skinsModalButton}
              titleFont={Fonts.extraBold}
            />
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

export default SkinsModal;
