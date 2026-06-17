---
title: "Top 10 Ways to Troubleshoot Windows System Information Tools in Windows 10"
date: "2025-08-15"
author: "Riley"
categories: 
  - "system-tools"
---

Windows 10 includes a variety of built-in system information tools that help you view and diagnose your PC’s hardware, drivers, and software environment. However, these tools can sometimes return incomplete data, fail to open, or report errors. Troubleshooting them effectively requires understanding both the tools themselves and the Windows system components they rely on. Below are ten expert-recommended ways to troubleshoot Windows system information tools, with guidance for both beginners and advanced users.

1\. Verify the System Information App (msinfo32) is Enabled Beginner level: Press Windows + R, type msinfo32, and press Enter. If the tool does not open, it could be disabled by policy or corrupted. Advanced level: Check Group Policy settings by pressing Windows + R, typing gpedit.msc, and navigating to User Configuration > Administrative Templates > System. Ensure “Prevent access to the System Information tool” is set to Not Configured.

2\. Run System File Checker for Missing or Damaged Components Beginner level: Open Command Prompt as Administrator, type sfc /scannow, and press Enter. Wait for the scan to repair files. Advanced level: If SFC reports unrepairable files, run DISM /Online /Cleanup-Image /RestoreHealth to fix Windows image integrity, which can restore msinfo32 functionality.

3\. Test with Safe Mode to Rule Out Third-Party Interference Beginner level: Go to Settings > Update & Security > Recovery and under Advanced Startup choose Restart now, then select Troubleshoot > Advanced options > Startup Settings > Restart, and choose Safe Mode. Advanced level: If the System Information tool works in Safe Mode, use MSConfig to perform a selective startup and re-enable services one at a time to isolate the cause.

4\. Check WMI Repository Health The Windows Management Instrumentation (WMI) service is critical for many system information tools. Beginner level: Press Windows + R, type services.msc, locate Windows Management Instrumentation, and ensure it is running. Advanced level: Open Command Prompt (Admin) and run winmgmt /verifyrepository to check for corruption. If inconsistent, use winmgmt /salvagerepository to repair.

5\. Inspect System Performance Data via Performance Monitor Beginner level: Press Windows + R, type perfmon, and press Enter. Check if counters load correctly. Advanced level: Use command-line tool lodctr /r to rebuild performance counters if they are missing or corrupted.

6\. Use [Glary Utilities](https://www.glarysoft.com) for a Comprehensive System Health Check [Glary Utilities](https://www.glarysoft.com) offers a one-click maintenance option that can clear temporary files, repair registry issues, and detect startup problems that may prevent system tools from running. Beginner level: Install and open Glary Utilities, run the 1-Click Maintenance, and check if msinfo32 launches afterward. Advanced level: Use the Startup Manager and Disk Repair modules in [Glary Utilities](https://www.glarysoft.com) to eliminate conflicts and repair disk errors affecting WMI and related components.

7\. Test the DirectX Diagnostic Tool (dxdiag) Beginner level: Press Windows + R, type dxdiag, press Enter, and check for errors on the System and Display tabs. Advanced level: If DirectX files are missing, manually reinstall DirectX from the official Microsoft package or update graphics drivers from the manufacturer’s site.

8\. Ensure Environment Variables are Correct Some system tools rely on proper environment variables. Beginner level: Go to Control Panel > System > Advanced system settings > Environment Variables and ensure TEMP and TMP point to valid directories. Advanced level: Verify the PATH variable includes required system directories such as C:\\Windows\\System32.

9\. Update Device Drivers and BIOS/UEFI Beginner level: Use Device Manager (Windows + X > Device Manager) to check for outdated or problematic drivers. Advanced level: Download the latest BIOS/UEFI firmware from your motherboard or system manufacturer to improve hardware detection in system information tools.

10\. Create a New User Profile to Rule Out Profile Corruption Beginner level: Go to Settings > Accounts > Family & other users > Add someone else to this PC, create a new account, log in, and test system tools. Advanced level: If the new profile works, migrate data and settings, then delete the corrupted user profile to fully resolve the issue.

By following these methods, both beginners and advanced Windows users can diagnose and fix issues with system information tools in Windows 10. Maintaining a clean, optimized system through regular tools like Glary Utilities, along with built-in Windows repairs, ensures long-term stability and accurate system reporting.
