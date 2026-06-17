---
title: "5 Proven Methods to Repair Windows System Information Tools in Windows"
date: "2025-07-05"
author: "Finn"
categories: 
  - "system-tools"
---

Windows system information tools like System Information (msinfo32), Device Manager, and Performance Monitor provide vital insights into your PC’s health and configuration. When these tools stop working correctly, troubleshooting your computer becomes much harder and more time-consuming. Fortunately, there are several proven methods to repair these tools and restore their functionality, saving you hours of frustration. This guide covers practical solutions for both beginners and advanced users, including recommendations for using [Glary Utilities](https://www.glarysoft.com) to streamline the process.

Why Repair Windows System Information Tools?

System information tools let you view hardware details, diagnose problems, and manage your PC’s performance. If these tools crash, refuse to open, or display incomplete data, you lose valuable diagnostic and management capabilities. Repairing them promptly is crucial for efficient troubleshooting and ongoing maintenance.

Method 1: Restart Windows Management Instrumentation (WMI) Service

Beginner-Friendly

WMI is a core component that system tools rely on to gather hardware and software information. If the WMI service is malfunctioning, many system tools will fail.

Steps: 1. Press Windows + R, type services.msc, and press Enter. 2. Scroll down to "Windows Management Instrumentation". 3. Right-click it and select Restart.

If restarting doesn’t help, try stopping the service, waiting a minute, and starting it again. This simple fix often restores functionality to System Information and related tools.

Method 2: Use the System File Checker (SFC)

Beginner-Friendly

Corrupted or missing system files can prevent Windows tools from working properly. The SFC utility scans for and repairs damaged files.

Steps: 1. Press Windows + S, type cmd, right-click Command Prompt, and select Run as administrator. 2. In the command window, type: sfc /scannow and press Enter. 3. Wait for the scan to complete; it may take several minutes. 4. Follow any on-screen instructions.

Real-World Example: If msinfo32 won’t launch or shows errors, running SFC can often restore it by fixing the underlying system files.

Method 3: Repair Tool Shortcuts and File Associations

Beginner/Intermediate

Sometimes, the issue is as simple as a broken shortcut or incorrect file association.

Steps: 1. For System Information, press Windows + R, type msinfo32, and press Enter. If it opens, the shortcut may be broken. 2. Recreate the shortcut: Right-click the desktop, choose New > Shortcut, and enter msinfo32.exe. 3. For Device Manager or similar tools, access them via Control Panel > Administrative Tools.

If tools fail to start, check file associations: 1. Press Windows + I, go to Apps > Default apps > Choose default apps by file type. 2. Set correct associations for system tools if needed.

Method 4: Run DISM to Restore System Health

Intermediate/Advanced

Deployment Imaging Service and Management Tool (DISM) repairs Windows images and components, addressing deeper system corruption.

Steps: 1. Open Command Prompt as administrator. 2. Type: DISM /Online /Cleanup-Image /RestoreHealth and press Enter. 3. Wait for the process to finish (can take 10–30 minutes). 4. Restart your computer.

Try launching the problematic system tool again. DISM often resolves stubborn errors that SFC can’t fix.

Method 5: Optimize and Repair with Glary Utilities

Beginner to Advanced

Glary Utilities offers a user-friendly way to repair and optimize system tools and Windows as a whole. It’s especially useful if you want a quick, all-in-one solution without delving into technical commands.

How Glary Utilities Helps: - One-Click Maintenance: Scans and fixes registry issues, removes junk files, and checks for broken shortcuts, which can directly affect system tools. - Registry Repair: Resolves registry problems that may prevent system tools from launching or functioning. - Shortcut Fixer: Detects and repairs broken shortcuts for system tools. - File Association Fixer: Automatically corrects many file association problems.

Steps: 1. Download and install [Glary Utilities](https://www.glarysoft.com) from the official website. 2. Launch the application and select 1-Click Maintenance. 3. Let it scan your system (registry, shortcuts, files, etc.). 4. Click Repair Problems to automatically fix detected issues. 5. Use the Advanced Tools section to repair specific problems, such as Registry Repair or Shortcut Fixer, if needed.

This method saves time by handling multiple potential causes with a single scan, making it ideal for both beginners and advanced users who want an efficient repair process.

Tips for Advanced Users

\- Investigate Event Viewer logs for related errors (Windows Logs > Application/System). - Check Environment Variables (System Properties > Advanced > Environment Variables) to ensure system paths are correct. - Consider creating a new user profile if system tools work in Safe Mode but not under your regular account.

Conclusion

Windows system information tools are essential for monitoring and maintaining your computer. By following these five proven methods—from restarting WMI all the way to using Glary Utilities—you can quickly identify and resolve issues that might otherwise waste hours of your time. For most users, [Glary Utilities](https://www.glarysoft.com) offers the fastest path to a healthy, smoothly running Windows system, but combining these methods ensures thorough repair and lasting results.
