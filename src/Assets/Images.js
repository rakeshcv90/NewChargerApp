// ─── Local Image Registry ────────────────────────────────────
// Centralized file for all local image imports.
// Usage:  import { Images } from '../Assets/Images';
//         <Image source={Images.logo} />
//
// To add a new image:
//   1. Drop the file into src/Assets/images/
//   2. Add a require() entry below
// ─────────────────────────────────────────────────────────────

const Images = {
    // ── Branding ──
    // logo: require('./images/logo.png'),
    // logoWhite: require('./images/logo_white.png'),
    // appIcon: require('./images/app_icon.png'),

    // ── Splash / Onboarding ──
    // splashBg: require('./images/splash_bg.png'),
    // onboarding1: require('./images/onboarding_1.png'),
    // onboarding2: require('./images/onboarding_2.png'),

    // ── Icons ──
    GOOGLE: require('../Assets/Icon/google.png'),
    APPLE: require('../Assets/Icon/apple.png'),
   

    // ── Placeholders ──
    red_car: require('../Assets/Image/red_car.png'),
    // placeholder: require('./images/placeholder.png'),
    // avatar: require('./images/avatar.png'),
    // emptyState: require('./images/empty_state.png'),
};

export default Images;
