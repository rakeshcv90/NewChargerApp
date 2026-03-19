import React, { useMemo } from 'react';
import { View, StyleSheet, Switch, ScrollView, TouchableOpacity, Platform } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { s, vs, ms } from 'react-native-size-matters';

import CustomText from '../../Component/CustomText';
import Fonts from '../../Utility/Fonts';
import { useTheme } from '../../Utility/ThemeContext';
import LogoutDialog from '../../Component/LogoutDialog';

const InfoRow = ({ label, value, colors }) => (
  <View style={rowStyles(colors).row}>
    <CustomText size={14} color={colors.textSecondary}>
      {label}
    </CustomText>

    <CustomText size={14} color={colors.textPrimary} font={Fonts.semiBold}>
      {value}
    </CustomText>
  </View>
);

const rowStyles = colors =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: vs(12),
      borderBottomWidth: 1,
      borderColor: colors.border,
    },
  });

const PaymentItem = ({ brand, number, name, expiry, isDefault, colors }) => (
  <View style={paymentStyles(colors).paymentRow}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={paymentStyles(colors).cardLogo}>
        <CustomText size={12} font={Fonts.semiBold} color={colors.primary}>
          {brand}
        </CustomText>
      </View>

      <View style={{ marginLeft: s(12) }}>
        <CustomText size={15} font={Fonts.semiBold} color={colors.textPrimary}>
          {number}
        </CustomText>

        <CustomText size={12} color={colors.textSecondary}>
          {name} · {expiry}
        </CustomText>
      </View>
    </View>

    {isDefault ? (
      <View style={paymentStyles(colors).defaultBadge}>
        <CustomText size={12} font={Fonts.semiBold} color={colors.success}>
          Default
        </CustomText>
      </View>
    ) : (
      <View style={paymentStyles(colors).setDefaultBtn}>
        <CustomText
          size={12}
          font={Fonts.semiBold}
          color={colors.textSecondary}
        >
          Set Default
        </CustomText>
      </View>
    )}
  </View>
);

const paymentStyles = colors =>
  StyleSheet.create({
    paymentRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: s(10),
      paddingVertical: vs(10),
    },
    cardLogo: {
      width: ms(45),
      height: ms(32),
      borderRadius: ms(8),
      borderWidth: 1,
      borderColor: colors.border,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.card,
    },
    defaultBadge: {
      borderWidth: 1,
      borderColor: colors.success,
      paddingHorizontal: s(14),
      paddingVertical: vs(5),
      borderRadius: ms(20),
      backgroundColor: colors.success + '15',
    },
    setDefaultBtn: {
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: s(14),
      paddingVertical: vs(6),
      borderRadius: ms(20),
    },
  });

const MenuItem = ({ label, isDestructive, isLast, colors, rightElement, onPress }) => (
  <TouchableOpacity
    activeOpacity={onPress ? 0.7 : 1}
    onPress={onPress}
    style={[menuStyles(colors).menuRow, isLast && { borderBottomWidth: 0 }]}
  >
    <CustomText
      size={14}
      font={Fonts.semiBold}
      color={isDestructive ? colors.error : colors.textSecondary}
    >
      {label}
    </CustomText>
    {rightElement ? (
      rightElement
    ) : (
      <CustomText size={16} color={colors.textSecondary}>
        ›
      </CustomText>
    )}
  </TouchableOpacity>
);

const menuStyles = colors =>
  StyleSheet.create({
    menuRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: s(16),
      paddingVertical: vs(16),
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
  });

const Profile = () => {
  const navigation = useNavigation();
  const { colors, theme, themeMode, setThemeMode, toggleTheme } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const insets = useSafeAreaInsets();
  const [showLogoutDialog, setShowLogoutDialog] = React.useState(false);

  const handleLogout = () => {
    setShowLogoutDialog(true);
  };

  const confirmLogout = () => {
    setShowLogoutDialog(false);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Splash' }],
    });
  };

  const switchTrackColor = { 
    false: theme === 'dark' ? '#333333' : '#D1D1D1', 
    true: colors.primary + '80'
  };

  return (
    <SafeAreaView style={styles.container}>
      <LogoutDialog
        visible={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        onConfirm={confirmLogout}
      />
      {/* HEADER */}
      <View style={styles.header}>
        {/* Avatar */}
        <View style={styles.avatar}>
          <CustomText
            size={22}
            font={Fonts.extraBold}
            color={colors.textOnPrimary}
          >
            SJ
          </CustomText>
        </View>

        <View style={{ flex: 1, marginLeft: s(15) }}>
          <CustomText
            size={22}
            font={Fonts.extraBold}
            color={colors.textPrimary}
          >
            Sarah Johnson
          </CustomText>

          <CustomText size={13} color={colors.textSecondary}>
            Sgt · Fort Liberty, NC · 7 months
          </CustomText>
        </View>

        <View style={styles.planBadge}>
          <CustomText size={12} font={Fonts.semiBold} color={colors.success}>
            Pro Plan
          </CustomText>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: 100 + insets.bottom },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <CustomText
          size={14}
          font={Fonts.semiBold}
          color={colors.textSecondary}
          style={styles.sectionTitle}
        >
          👤 PERSONAL INFO
        </CustomText>

        <View style={styles.card}>
          <InfoRow label="Full Name" value="Sarah Johnson" colors={colors} />
          <InfoRow label="Email" value="email@example.com" colors={colors} />
          <InfoRow label="Phone" value="(910) 555-0142" colors={colors} />
          <InfoRow label="Branch" value=" Army" colors={colors} />
          <InfoRow label="Rank" value="Sergeant (E-5)" colors={colors} />
          <InfoRow label="Unit" value="Apt 4B · Building A" colors={colors} />
          <InfoRow
            label="Installation"
            value="Fort Liberty, NC"
            colors={colors}
          />
          <InfoRow label="Member Since" value="August 2025" colors={colors} />
        </View>

        <CustomText
          size={14}
          font={Fonts.semiBold}
          color={colors.textSecondary}
          style={styles.sectionTitle}
        >
          💳 PAYMENT
        </CustomText>
        <View style={styles.paymentCard}>
          <PaymentItem
            brand="VISA"
            number="•••• •••• •••• 4821"
            name="Sarah Johnson"
            expiry="Exp 09/27"
            isDefault
            colors={colors}
          />

          <View style={styles.divider} />

          <PaymentItem
            brand="MC"
            number="•••• •••• •••• 7703"
            name="Sarah Johnson"
            expiry="Exp 03/26"
            colors={colors}
          />

          <View style={styles.divider} />

          <View style={styles.addPaymentRow}>
            <CustomText size={14} font={Fonts.semiBold} color={colors.success}>
              + Add Payment Method
            </CustomText>

            <CustomText size={18} color={colors.textSecondary}>
              ›
            </CustomText>
          </View>
        </View>

        <View style={[styles.card, { marginTop: vs(5) }]}>
          <CustomText size={13} color={colors.textSecondary}>
            Billing Address
          </CustomText>

          <CustomText
            size={15}
            font={Fonts.semiBold}
            color={colors.textPrimary}
          >
            Building A, Apt 4B
          </CustomText>

          <CustomText
            size={15}
            font={Fonts.semiBold}
            color={colors.textPrimary}
          >
            Fort Liberty, NC 28310
          </CustomText>

          <View style={styles.autoPay}>
            <CustomText size={14} color={colors.textSecondary}>
              Auto-Pay
            </CustomText>

            <Switch
              value={true}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.background}
            />
          </View>
        </View>

        {/* ACCOUNT SECTION */}
        <CustomText
          size={14}
          font={Fonts.extraBold}
          color={colors.textSecondary}
          style={[styles.sectionTitle, { marginTop: vs(15) }]}
        >
          ⚙ ACCOUNT
        </CustomText>
        <View style={styles.menuCard}>
          <MenuItem
            label="Dark Mode"
            colors={colors}
            rightElement={
              <Switch
                value={theme === 'dark'}
                onValueChange={toggleTheme}
                trackColor={switchTrackColor}
                thumbColor={theme === 'dark' ? colors.primary : '#FFFFFF'}
              />
            }
          />
          <MenuItem
            label="Match System"
            colors={colors}
            rightElement={
              <Switch
                value={themeMode === 'system'}
                onValueChange={val => setThemeMode(val ? 'system' : theme)}
                trackColor={switchTrackColor}
                thumbColor={themeMode === 'system' ? colors.primary : '#FFFFFF'}
              />
            }
          />
          <MenuItem label="Notifications" colors={colors} />
          <MenuItem label="Privacy & Data" colors={colors} />
          <MenuItem label="Help & Support" colors={colors} />
          <MenuItem 
            label="Sign Out" 
            isDestructive 
            isLast 
            colors={colors} 
            onPress={handleLogout} 
          />
        </View>
        <View style={{ height: vs(20) }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const createStyles = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: s(10),
    },

    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: vs(10),
      marginBottom: vs(25),
    },

    avatar: {
      width: ms(55),
      height: ms(55),
      borderRadius: ms(30),
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },

    planBadge: {
      borderWidth: 1,
      borderColor: colors.success,
      paddingHorizontal: s(12),
      paddingVertical: vs(5),
      borderRadius: ms(20),
    },

    sectionTitle: {
      marginBottom: vs(10),
    },

    card: {
      backgroundColor: colors.card,
      borderRadius: ms(15),
      borderWidth: 1,
      borderColor: colors.border,
      padding: ms(15),
      marginBottom: vs(10),
    },

    autoPay: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: vs(20),
    },

    scrollContent: {
      flexGrow: 1,
    },

    paymentCard: {
      backgroundColor: colors.card,
      borderRadius: ms(18),
      borderWidth: 1,
      borderColor: colors.border,
      overflow: 'hidden',
    },

    addPaymentRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: s(16),
      paddingVertical: vs(14),
    },

    divider: {
      height: 1,
      backgroundColor: colors.border,
    },

    menuCard: {
      backgroundColor: colors.card,
      borderRadius: ms(18),
      borderWidth: 1,
      borderColor: colors.border,
      overflow: 'hidden',
    },
  });

export default Profile;
