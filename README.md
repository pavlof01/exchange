![Exchange App Icon](./android/app/src/main/res/mipmap-xhdpi/ic_launcher.png)

# Exchange 💰

> React Native 0.56.4 app. Supported operating systems are >= **Android 4.1 (API 16)** and >= **iOS 9.0**.

## Get Started 🚀

- `npm install`
- Create file `/android/local.properties` with path to SDK dir. For example: `sdk.dir=/Users/{username}/Library/Android/sdk`

### Generating the release APK

- install Android Studio - https://developer.android.com/studio/
- install the Android SDK - Tools > SDK Manager (Android SDK Build-Tools, Android SDK Platform-Tools, Android SDK Tools)

- edit signing config in android/app/build.gradle file (android.signingConfigs.release) (or create new key - https://developer.android.com/studio/publish/app-signing - Generate a key and keystore)

- `mkdir -p android/app/src/main/assets`
- `cd android && ./gradlew assembleRelease`
- check new apk file in android/app/build/outputs/apk/release/app-release.apk

### Deployment for iOS

- Create the appropriate Apple Developer account (personal or business)
- After creating the provisioning certificate, In Xcode menu, Select the device as Generic iOS Device.
- Product -> Clean and build your application. (If the provisioning certificate is not valid,it will lead to build failed with an error.If so you have to change it to a valid certificate through your project->build settings.Else if build succeeded just leave this step.)
- Select Product -> archive, it will create an archive file in Organiser -> archives and open it up for you after archive finished.
- Once archive is successfully completed it will open in Organizer window, then select the export function from the right side section.
