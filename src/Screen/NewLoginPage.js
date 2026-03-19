import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from '@react-native-vector-icons/material-icons';

const { width, height } = Dimensions.get('window');

const NewLoginPage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      {/* ── ORANGE BLOB — top-left ── */}
      <LinearGradient
        colors={['#FFA040', '#FF5A45']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.topWave}
      />

      {/* ── BLUE BLOB — bottom-right ── */}
      <LinearGradient
        colors={['#45D8F5', '#0099E5']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.bottomWave}
      />

      {/* ── MAIN CONTENT ── */}
      <View style={styles.content}>
        {/* "Login" title — above the card, in white space */}
        <Text style={styles.title}>Login</Text>

        {/* ── INPUT CARD + TEAL BUTTON (together in a relative wrapper) ── */}
        <View style={styles.cardWrapper}>
          {/* The card itself */}
          <View style={styles.card}>
            {/* USERNAME ROW */}
            <View style={styles.inputRow}>
              <Icon name="person-outline" size={19} color="#99AAB5" />
              <TextInput
                value={username}
                onChangeText={setUsername}
                placeholder="Username"
                placeholderTextColor="#99AAB5"
                style={styles.input}
                autoCapitalize="none"
              />
            </View>

            {/* DIVIDER between rows */}
            <View style={styles.divider} />

            {/* PASSWORD ROW */}
            <View style={styles.inputRow}>
              <Icon name="lock-outline" size={19} color="#99AAB5" />
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••••"
                placeholderTextColor="#99AAB5"
                secureTextEntry
                style={styles.input}
              />
            </View>
          </View>

          {/* TEAL CIRCLE — overlaps the right edge of the card, centred vertically */}
          <TouchableOpacity style={styles.actionBtn} activeOpacity={0.85}>
            <LinearGradient
              colors={['#2EDDC9', '#20C9B5']}
              style={styles.actionGradient}
            >
              <Icon name="arrow-forward" size={22} color="#FFF" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* ── FORGOT ── */}
        <TouchableOpacity style={styles.forgotWrapper}>
          <Text style={styles.forgotText}>Forgot ?</Text>
        </TouchableOpacity>

        {/* ── REGISTER ── */}
        <TouchableOpacity
          style={styles.registerWrapper}
          onPress={() => navigation?.navigate('Register')}
        >
          <Text style={styles.registerText}>Register</Text>
          <View style={styles.registerUnderline} />
        </TouchableOpacity>
      </View>

      {/* ── FACE ID — bottom-right corner ── */}
      <View style={styles.faceIdWrapper}>
        <Icon name="face-retouching-natural" size={30} color="#45D8F5" />
      </View>
    </View>
  );
};

const WAVE_R = width * 0.72;

const styles = StyleSheet.create({
  /* ── SCREEN ── */
  container: {
    flex: 1,
    backgroundColor: '#F8FAFB',
  },

  /* ── ORANGE TOP-LEFT WAVE ── */
  topWave: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height * 0.25,
    borderBottomRightRadius: WAVE_R,
  },

  /* ── BLUE BOTTOM-RIGHT WAVE ── */
  bottomWave: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: width,
    height: height * 0.25,
    borderTopLeftRadius: WAVE_R,
  },

  /* ── CONTENT centred in screen ── */
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },

  /* ── LOGIN TITLE — above the card ── */
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#3D4A5C',
    textAlign: 'center',
    marginBottom: 28,
    letterSpacing: 0.3,
  },

  /* ── CARD WRAPPER — gives us a relative container for the card + floating btn ── */
  cardWrapper: {
    position: 'relative',
    marginRight: 28, // leave room so floating button doesn't clip
  },

  /* ── THE CARD ── */
  card: {
    backgroundColor: '#EEF1F6',
    borderRadius: 22,
    paddingVertical: 6,
    paddingLeft: 20,
    paddingRight: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },

  /* ── INPUT ROWS ── */
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Platform.OS === 'ios' ? 14 : 11,
    gap: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#3D4A5C',
    paddingVertical: 0,
  },

  /* thin divider between username and password */
  divider: {
    height: 1,
    backgroundColor: '#D8DEE9',
    marginHorizontal: 4,
  },

  /* ── TEAL ACTION BUTTON ── */
  actionBtn: {
    position: 'absolute',
    right: -42, // pops out of the card's right edge
    top: '50%',
    marginTop: -27, // half of button height to vertically centre
  },
  actionGradient: {
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#2EDDC9',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },

  /* ── FORGOT ── */
  forgotWrapper: {
    alignSelf: 'flex-end',
    marginTop: 14,
    marginBottom: 24,
    marginRight: 4,
  },
  forgotText: {
    color: '#B0BEC5',
    fontSize: 13,
  },

  /* ── REGISTER ── */
  registerWrapper: {
    alignSelf: 'flex-start',
    marginLeft: 4,
  },
  registerText: {
    color: '#FF5A45',
    fontSize: 19,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  registerUnderline: {
    height: 2,
    backgroundColor: '#FF5A45',
    marginTop: 3,
    borderRadius: 1,
  },

  /* ── FACE ID ── */
  faceIdWrapper: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 36 : 26,
    right: 26,
    opacity: 0.65,
  },
});

export default NewLoginPage;
