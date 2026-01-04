# Field Inspector - Complete Installation Guide

This guide walks you through installing the Field Inspector app on your Android phone or tablet. No programming experience required.

---

## Table of Contents

1. [Option A: Quick Local Testing](#option-a-quick-local-testing-easiest)
2. [Option B: Deploy to GitHub Pages (Free, Permanent)](#option-b-deploy-to-github-pages-free-permanent)
3. [Option C: Convert to APK for Sideloading](#option-c-convert-to-apk-for-sideloading)
4. [Troubleshooting](#troubleshooting)

---

## Option A: Quick Local Testing (Easiest)

**Best for**: Testing the app quickly on your local network before permanent deployment.

**Requirements**: 
- A computer (Windows, Mac, or Linux)
- Python installed (comes pre-installed on Mac/Linux)
- Your Android device on the same WiFi network

### Step 1: Check if Python is Installed

**On Windows:**
1. Press `Windows + R`, type `cmd`, press Enter
2. Type `python --version` and press Enter
3. If you see a version number (like "Python 3.11.4"), you're good!
4. If not, download Python from https://www.python.org/downloads/
   - **Important**: Check the box "Add Python to PATH" during installation

**On Mac/Linux:**
1. Open Terminal
2. Type `python3 --version` and press Enter
3. You should see a version number

### Step 2: Extract the ZIP File

1. Download the `FieldInspector.zip` file
2. Find it in your Downloads folder
3. **Windows**: Right-click → "Extract All" → Choose location → Click "Extract"
4. **Mac**: Double-click the ZIP file to extract

You should now have a folder called `FieldInspector` containing:
```
FieldInspector/
├── index.html
├── manifest.json
├── sw.js
├── css/
├── js/
└── icons/
```

### Step 3: Start the Local Web Server

1. Open Command Prompt (Windows) or Terminal (Mac/Linux)

2. Navigate to the FieldInspector folder:
   
   **Windows** (if extracted to Downloads):
   ```
   cd C:\Users\YourName\Downloads\FieldInspector
   ```
   
   **Mac/Linux**:
   ```
   cd ~/Downloads/FieldInspector
   ```

3. Start the web server:
   
   **Windows**:
   ```
   python -m http.server 8080
   ```
   
   **Mac/Linux**:
   ```
   python3 -m http.server 8080
   ```

4. You should see:
   ```
   Serving HTTP on 0.0.0.0 port 8080 ...
   ```

5. **Keep this window open!** The server stops if you close it.

### Step 4: Find Your Computer's IP Address

**Windows:**
1. Press `Windows + R`, type `cmd`, press Enter
2. Type `ipconfig` and press Enter
3. Look for "IPv4 Address" under your WiFi adapter
4. It will look like: `192.168.1.105`

**Mac:**
1. Click Apple menu → System Preferences → Network
2. Select WiFi on the left
3. Your IP is shown on the right (like `192.168.1.105`)

**Linux:**
1. Open Terminal
2. Type `hostname -I`
3. First number is your IP

### Step 5: Open on Your Android Device

1. Make sure your phone is on the **same WiFi network** as your computer

2. Open **Chrome** on your Android device

3. In the address bar, type your computer's IP and port:
   ```
   http://192.168.1.105:8080
   ```
   (Replace with YOUR IP address from Step 4)

4. The app should load!

### Step 6: Install to Home Screen

1. Once the app loads in Chrome, tap the **three dots menu** (⋮) in the top right

2. Tap **"Install app"** or **"Add to Home screen"**

3. Tap **"Install"** on the popup

4. The app icon will appear on your home screen!

**Note**: This installation only works while your computer's server is running. For a permanent solution, use Option B or C.

---

## Option B: Deploy to GitHub Pages (Free, Permanent)

**Best for**: A permanent installation that works anywhere, anytime.

**Requirements**: 
- A GitHub account (free)
- About 15 minutes

### Step 1: Create a GitHub Account

1. Go to https://github.com
2. Click **"Sign up"**
3. Follow the prompts to create your free account
4. Verify your email address

### Step 2: Create a New Repository

1. Log into GitHub
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in:
   - **Repository name**: `field-inspector` (or any name you like)
   - **Description**: "Offline inspection app" (optional)
   - **Public**: Select this option (required for free GitHub Pages)
   - Check **"Add a README file"**
5. Click **"Create repository"**

### Step 3: Upload the App Files

1. In your new repository, click **"Add file"** → **"Upload files"**

2. Open your `FieldInspector` folder on your computer

3. Select ALL the files and folders inside:
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - `README.md`
   - `css` folder
   - `js` folder
   - `icons` folder

4. Drag them into the GitHub upload area

5. Scroll down and click **"Commit changes"**

6. Wait for the upload to complete (may take a minute)

### Step 4: Enable GitHub Pages

1. In your repository, click **"Settings"** (tab at the top)

2. In the left sidebar, click **"Pages"**

3. Under **"Source"**, select:
   - **Branch**: `main`
   - **Folder**: `/ (root)`

4. Click **"Save"**

5. Wait 2-3 minutes for GitHub to build your site

6. Refresh the page - you'll see a green box with your URL:
   ```
   Your site is live at https://yourusername.github.io/field-inspector/
   ```

### Step 5: Install on Your Android Device

1. Open **Chrome** on your Android phone/tablet

2. Go to your GitHub Pages URL:
   ```
   https://yourusername.github.io/field-inspector/
   ```

3. Wait for the app to fully load

4. Tap the **three dots menu** (⋮) in the top right

5. Tap **"Install app"** or **"Add to Home screen"**

6. Tap **"Install"**

7. **Done!** The app is now installed and works completely offline!

### Testing Offline Mode

1. Turn on **Airplane Mode** on your phone
2. Open the Field Inspector app from your home screen
3. It should work perfectly without internet!

---

## Option C: Convert to APK for Sideloading

**Best for**: Installing like a "real" app, sharing with others who don't want to use a browser.

**Requirements**:
- Complete Option B first (need a live HTTPS URL)
- About 10 minutes

### Step 1: Use PWABuilder

1. Go to https://www.pwabuilder.com

2. Enter your GitHub Pages URL:
   ```
   https://yourusername.github.io/field-inspector/
   ```

3. Click **"Start"**

4. Wait for PWABuilder to analyze your app (30-60 seconds)

5. You'll see a score and report - don't worry if it's not perfect!

### Step 2: Generate the Android Package

1. Click **"Build"** (or navigate to the Package section)

2. Find **"Android"** and click **"Store Package"** or **"Options"**

3. Fill in the details:
   - **Package ID**: `com.yourname.fieldinspector`
   - **App name**: `Field Inspector`
   - **App version**: `1.0.0`
   - Leave other settings as default

4. Click **"Generate"** or **"Download"**

5. A ZIP file will download containing your APK

### Step 3: Extract the APK

1. Find the downloaded ZIP file (usually named something like `pwabuilder-android.zip`)

2. Extract/unzip it

3. Inside, find the APK file - usually in a folder structure like:
   ```
   /app/build/outputs/apk/release/app-release-unsigned.apk
   ```
   or simply:
   ```
   /FieldInspector.apk
   ```

### Step 4: Transfer APK to Your Phone

**Option A - Direct Download:**
1. Upload the APK to Google Drive or Dropbox
2. Open the link on your phone and download

**Option B - USB Transfer:**
1. Connect your phone to computer via USB
2. Copy the APK to your phone's Downloads folder

**Option C - Email:**
1. Email the APK to yourself (if small enough)
2. Download attachment on your phone

### Step 5: Enable Unknown Sources

Before installing, you need to allow APK installations:

**Android 8.0 and newer:**
1. When you try to open the APK, you'll get a prompt
2. Tap **"Settings"**
3. Toggle on **"Allow from this source"** for Chrome/Files/your file manager
4. Go back and try opening the APK again

**Android 7.0 and older:**
1. Go to **Settings** → **Security**
2. Enable **"Unknown sources"**

### Step 6: Install the APK

1. Open your file manager app
2. Navigate to where you saved the APK
3. Tap the APK file
4. Tap **"Install"**
5. Wait for installation to complete
6. Tap **"Open"** or find the app on your home screen

**Done!** You now have a fully native-like app installed.

---

## Troubleshooting

### "This site can't be reached" (Local Testing)

- Make sure your computer and phone are on the **same WiFi network**
- Check that the server is still running (terminal window open)
- Try `http://` not `https://`
- Make sure you're using the correct IP address
- Check if your firewall is blocking port 8080

### "Install app" option not showing

- Make sure you're using **Chrome** (not Firefox, Samsung Internet, etc.)
- Refresh the page a few times
- Wait for the page to fully load
- Try closing Chrome and reopening

### App not working offline

- Open the app while online first (this downloads all files)
- Close and reopen the app
- Make sure you installed it to home screen (not just bookmarked)

### GitHub Pages not working

- Make sure repository is set to **Public**
- Wait 5-10 minutes after enabling Pages
- Check that files are in the root of the repository (not in a subfolder)
- Make sure `index.html` exists

### APK won't install

- Enable "Unknown sources" or "Install unknown apps"
- Make sure you downloaded the complete APK (not corrupted)
- Check that you have enough storage space
- Try a different file manager app

### Camera not working in app

- Make sure you granted camera permissions when prompted
- Go to phone Settings → Apps → Chrome → Permissions → Camera → Allow
- For installed PWA: Settings → Apps → Field Inspector → Permissions → Camera

### GPS/Location not working

- Enable Location services on your phone
- Grant location permission to the app
- Make sure you're not in Airplane mode (GPS may still work, but slower)

---

## Need More Help?

If you run into issues not covered here:

1. **Check the browser console** for errors:
   - On desktop: Press F12, click "Console" tab
   - On Android: Connect to computer, use chrome://inspect

2. **Common fixes**:
   - Clear browser cache and reload
   - Uninstall and reinstall the app
   - Try a different browser (Chrome works best)

3. **For GitHub Pages issues**:
   - Check repository Settings → Pages for error messages
   - Make sure all files uploaded correctly

---

## Quick Reference Card

| Task | Action |
|------|--------|
| Start local server | `python3 -m http.server 8080` |
| Find IP (Windows) | `ipconfig` in Command Prompt |
| Find IP (Mac) | System Preferences → Network |
| Install PWA | Chrome menu (⋮) → Install app |
| Test offline | Turn on Airplane mode, open app |
| GitHub Pages URL | `https://USERNAME.github.io/REPO/` |

---

*Guide created for Field Inspector v1.0.0*
