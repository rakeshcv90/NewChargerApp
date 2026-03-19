import React, { useState, useMemo } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { s, vs, ms } from 'react-native-size-matters';
import Fonts from '../../Utility/Fonts';
import CustomText from '../../Component/CustomText';
import { useTheme } from '../../Utility/ThemeContext';

const Billing = () => {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [activeTab, setActiveTab] = useState('current');

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* HEADER */}
        <View style={styles.header}>
          <CustomText
            font={Fonts.extraBold}
            size={25}
            color={colors.textPrimary}
            style={[{ letterSpacing: 2 }]}
          >
            💳 Billing
          </CustomText>

          <CustomText
            font={Fonts.semiBold}
            size={14}
            color={colors.textSecondary}
            style={[{ letterSpacing: 2 }]}
          >
            February 2026
          </CustomText>
        </View>

        {/* TABS */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'current' && styles.activeTab,
            ]}
            onPress={() => setActiveTab('current')}
          >
            <CustomText
              font={Fonts.semiBold}
              size={14}
              color={activeTab === 'current' ? colors.primary : colors.textSecondary}
              style={[{ letterSpacing: 1 }]}
            >
              Current Period
            </CustomText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'history' && styles.activeTab,
            ]}
            onPress={() => setActiveTab('history')}
          >
            <CustomText
              font={Fonts.semiBold}
              size={14}
              color={activeTab === 'history' ? colors.primary : colors.textSecondary}
              style={[{ letterSpacing: 1 }]}
            >
              History
            </CustomText>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: vs(120) }}
        >
          {activeTab === 'current' && (
            <View style={styles.section}>
              <View style={styles.badge}>
                <CustomText
                  size={12}
                  color={colors.primary}
                  font={Fonts.semiBold}
                >
                  ● In Progress
                </CustomText>
              </View>

              <View style={styles.chartRow}>
                <View style={styles.chartWrapper}>
                  <AnimatedCircularProgress
                    size={ms(100)}
                    width={ms(10)}
                    fill={88}
                    tintColor={colors.primary}
                    backgroundColor="transparent"
                    rotation={0}
                    lineCap="round"
                  />

                  <AnimatedCircularProgress
                    size={ms(100)}
                    width={ms(10)}
                    fill={8}
                    tintColor={colors.warning}
                    backgroundColor="transparent"
                    rotation={316}
                    lineCap="round"
                    style={StyleSheet.absoluteFill}
                  />

                  <AnimatedCircularProgress
                    size={ms(100)}
                    width={ms(10)}
                    fill={4}
                    tintColor={colors.info}
                    backgroundColor="transparent"
                    rotation={345}
                    lineCap="round"
                    style={StyleSheet.absoluteFill}
                  />

                  <View style={styles.chartCenter}>
                    <CustomText
                      size={20}
                      font={Fonts.semiBold}
                      color={colors.textPrimary}
                      align="center"
                    >
                      $62.14
                    </CustomText>

                    <CustomText
                      size={10}
                      color={colors.textSecondary}
                      font={Fonts.semiBold}
                      align="center"
                    >
                      TOTAL SO FAR
                    </CustomText>
                  </View>
                </View>

                <View style={styles.chartValues}>
                  <Row
                    label="Subscription"
                    value="$55.09"
                    color={colors.primary}
                    colors={colors}
                  />
                  <Row label="Add-Ons" value="$4.99" color={colors.warning} colors={colors} />
                  <Row label="Tax" value="$2.06" color={colors.info} colors={colors} />
                  <View style={styles.divider} />
                  <Row
                    label="Total"
                    value="$62.14"
                    bold
                    color={colors.textMuted}
                    colors={colors}
                  />
                </View>
              </View>
              <View style={styles.dividerBig} />

              <View>
                <View style={styles.rowBetween}>
                  <CustomText
                    font={Fonts.extraBold}
                    size={14}
                    color={colors.textSecondary}
                  >
                    KWH USAGE
                  </CustomText>

                  <CustomText
                    font={Fonts.semiBold}
                    size={14}
                    color={colors.textPrimary}
                    style={{ fontWeight: 700 }}
                  >
                    247 / 318 kWh
                  </CustomText>
                </View>

                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { backgroundColor: colors.primary }]} />
                </View>

                <View
                  style={[
                    styles.rowBetween,
                    { gap: s(10), justifyContent: 'flex-start' },
                  ]}
                >
                  <View style={styles.planRow}>
                    <View
                      style={[
                        styles.dot,
                        { backgroundColor: colors.primary },
                      ]}
                    />
                    <CustomText
                      size={13}
                      color={colors.textSecondary}
                      font={Fonts.semiBold}
                    >
                      Plan: 300 kWh
                    </CustomText>
                  </View>

                  <View style={styles.planRow}>
                    <View
                      style={[styles.dot, { backgroundColor: '#22C1DC' }]}
                    />
                    <CustomText
                      size={13}
                      color={colors.textSecondary}
                      font={Fonts.semiBold}
                    >
                      Rollover: +18 kWh
                    </CustomText>
                  </View>
                </View>

                <View style={styles.rowBetween}>
                  <CustomText
                    size={11}
                    color={colors.textMuted}
                    font={Fonts.semiBold}
                  >
                    Feb 1
                  </CustomText>
                  <CustomText
                    size={11}
                    color={colors.textMuted}
                    font={Fonts.semiBold}
                  >
                    Due Mar 1
                  </CustomText>
                </View>
              </View>

              <View style={styles.dividerBig} />

              <View style={styles.rowBetween}>
                <CustomText
                  font={Fonts.extraBold}
                  size={14}
                  color={colors.textSecondary}
                >
                  RECENT SESSIONS
                </CustomText>

                <CustomText
                  size={13}
                  color={colors.primary}
                  font={Fonts.semiBold}
                >
                  View All →
                </CustomText>
              </View>

              <Session
                date="Feb 10"
                station="Station A-2 · 1h 23m"
                kwh="28.4 kWh"
                price="$2.49"
                colors={colors}
              />
              <Session
                date="Feb 8"
                station="Station B-1 · 2h 05m"
                kwh="41.2 kWh"
                price="$3.62"
                colors={colors}
              />
              <Session
                date="Feb 6"
                station="Station A-2 · 45m"
                kwh="15.8 kWh"
                price="$1.39"
                colors={colors}
              />
            </View>
          )}

          {activeTab === 'history' && (
            <View style={styles.section}>
              <View style={styles.statsRow}>
                <Stat value="12 mo" label="SUBSCRIBER" colors={colors} />
                <Stat value="3,189" label="TOTAL KWH" colors={colors} />
                <Stat value="$814" label="TOTAL BILLED" colors={colors} />
              </View>

              <View style={styles.dividerBig} />

              <History
                month="February 2026"
                usage="247 kWh · 4 sessions"
                price="$62.14"
                status="in progress"
                colors={colors}
              />
              <History
                month="January 2026"
                usage="300 kWh · 6 sessions"
                price="$79.45"
                status="paid"
                colors={colors}
              />
              <History
                month="December 2025"
                usage="285 kWh · 5 sessions"
                price="$75.67"
                status="paid"
                colors={colors}
              />
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const Row = ({ label, value, color, bold, colors }) => (
  <View style={rowStyles(colors).rowBetween}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {color && (
        <View
          style={{
            width: ms(8),
            height: ms(8),
            borderRadius: ms(4),
            backgroundColor: color,
            marginRight: s(8),
          }}
        />
      )}

      <CustomText
        size={13}
        color={colors.textSecondary}
        font={bold ? Fonts.semiBold : Fonts.regular}
      >
        {label}
      </CustomText>
    </View>

    <CustomText
      size={15}
      color={bold ? colors.textPrimary : colors.textSecondary}
      font={Fonts.semiBold}
    >
      {value}
    </CustomText>
  </View>
);

const rowStyles = colors => StyleSheet.create({
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: vs(1),
  },
});

const Session = ({ date, station, kwh, price, colors }) => (
  <View style={sessionStyles(colors).session}>
    <View>
      <CustomText size={14} font={Fonts.semiBold} color={colors.textPrimary}>
        {date}
      </CustomText>

      <CustomText size={11} color={colors.textMuted} font={Fonts.regular}>
        {station}
      </CustomText>
    </View>

    <View style={{ alignItems: 'flex-end' }}>
      <CustomText size={13} font={Fonts.medium} color={colors.primary}>
        {kwh}
      </CustomText>
      <CustomText size={13} color={colors.textSecondary} font={Fonts.regular}>
        {price}
      </CustomText>
    </View>
  </View>
);

const sessionStyles = colors => StyleSheet.create({
  session: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: vs(16),
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
});

const Stat = ({ value, label, colors }) => (
  <View style={{ alignItems: 'center', flex: 1 }}>
    <CustomText size={20} font={Fonts.semiBold} color={colors.textPrimary}>
      {value}
    </CustomText>

    <CustomText
      size={10}
      color={colors.textMuted}
      font={Fonts.semiBold}
      style={{ marginTop: 5 }}
    >
      {label}
    </CustomText>
  </View>
);

const History = ({ month, usage, price, status, colors }) => (
  <View style={historyStyles(colors).historyRow}>
    <View>
      <CustomText size={16} font={Fonts.semiBold} color={colors.textPrimary}>
        {month}
      </CustomText>

      <CustomText size={13} color={colors.textSecondary}>
        {usage}
      </CustomText>
    </View>

    <View style={{ alignItems: 'flex-end' }}>
      <CustomText size={16} font={Fonts.semiBold} color={colors.textPrimary}>
        {price}
      </CustomText>

      <CustomText size={13} color={status === 'paid' ? colors.success : colors.warning}>
        {status === 'paid' ? '✓ paid' : 'in progress'}
      </CustomText>
    </View>
  </View>
);

const historyStyles = colors => StyleSheet.create({
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: vs(18),
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
});

const createStyles = colors => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  card: {
    flex: 1,
    marginHorizontal: s(10),
    marginTop: vs(25),
    marginBottom: vs(70),
    borderRadius: ms(15),
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },

  header: {
    padding: ms(20),
  },

  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: colors.border,
  },

  tabButton: {
    flex: 1,
    paddingVertical: vs(14),
    alignItems: 'center',
  },

  activeTab: {
    borderBottomWidth: ms(2),
    borderBottomColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },

  section: {
    padding: ms(20),
  },

  badge: {
    borderWidth: 1,
    borderColor: colors.primary,
    paddingHorizontal: s(10),
    paddingVertical: vs(5),
    borderRadius: ms(20),
    alignSelf: 'flex-start',
    marginBottom: vs(20),
  },

  chartRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  divider: {
    height: vs(1),
    backgroundColor: colors.border,
    marginVertical: vs(10),
  },

  dividerBig: {
    height: vs(1),
    backgroundColor: colors.border,
    marginVertical: vs(14),
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: vs(1),
  },

  progressBar: {
    height: vs(10),
    backgroundColor: colors.border,
    borderRadius: ms(20),
    overflow: 'hidden',
    marginVertical: vs(10),
  },

  progressFill: {
    width: '77%',
    height: '100%',
  },

  statsRow: {
    flexDirection: 'row',
    marginBottom: vs(10),
  },

  chartWrapper: {
    width: ms(100),
    height: ms(100),
    justifyContent: 'center',
    alignItems: 'center',
  },

  chartCenter: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartValues: {
    marginLeft: s(30),
    flex: 1,
  },

  planRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  dot: {
    width: ms(10),
    height: ms(10),
    borderRadius: ms(3),
    marginRight: s(6),
  },
});

export default Billing;
