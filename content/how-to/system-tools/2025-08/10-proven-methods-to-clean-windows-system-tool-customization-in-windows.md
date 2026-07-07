---
title: "10 Proven Methods to Clean Windows System Tool Customization in Windows"
date: "2025-08-18"
author: "Nova"
categories: 
  - "system-tools"
---

Customizing Windows system tools can improve productivity, but over time, unused tweaks, leftover settings, and clutter can slow down your PC or cause confusion. Cleaning and resetting these customizations is an important step in maintaining a well-organized and fast system. Below are ten proven methods to streamline your Windows system tools, clearly explained for both beginners and advanced users.

1\. Reset Task Manager to Default View Beginners: Many users customize Task Manager by changing the tabs or sorting options. To reset it, open Task Manager with Ctrl + Shift + Esc, click Options, and choose "Reset Defaults." This brings back the standard view with processes, performance, and startup tabs. Advanced: You can also delete Task Manager preferences stored in the Registry. Navigate to HKEY\_CURRENT\_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\TaskManager and remove the settings. This forces Task Manager to generate new, clean defaults.

2\. Clear Event Viewer Custom Views Beginners: Event Viewer often gets cluttered with custom filters. Open Event Viewer, expand "Custom Views," right-click any non-default view, and select "Delete." Advanced: To fully reset, clear the saved logs by right-clicking on each log under Windows Logs and selecting "Clear Log." This helps if you’re troubleshooting recurring issues.

3\. Reset Disk Cleanup Settings Beginners: If you’ve previously customized which files Disk Cleanup removes, reset its choices by running Disk Cleanup and reselecting default checkboxes. Advanced: Open an elevated Command Prompt and type cleanmgr /sageset:1 followed by cleanmgr /sagerun:1. This lets you reconfigure from scratch and automate disk cleaning.

4\. Rebuild Windows Search Index Beginners: If you customized search but indexing feels slow, open Control Panel, go to Indexing Options, and choose "Advanced." Then click "Rebuild." This clears and recreates the entire index. Advanced: Power users can use PowerShell commands such as Restart-Service WSearch to quickly refresh the indexing service without rebooting.

5\. Reset System Configuration (msconfig) Beginners: If you’ve made startup or boot changes in msconfig, open the tool, select the "General" tab, and switch back to "Normal startup." Advanced: For advanced users, navigate to HKEY\_LOCAL\_MACHINE\\SOFTWARE\\Microsoft\\Shared Tools\\MSConfig in the Registry and remove stored configuration data.

6\. Clean Up Performance Monitor Settings Beginners: Performance Monitor allows adding custom data sets. To clean it, open Performance Monitor, expand "Data Collector Sets," right-click custom sets, and delete them. Advanced: For deeper cleanup, reset counters by opening an elevated Command Prompt and running lodctr /r. This rebuilds the performance counter settings.

7\. Remove Customizations in File Explorer Options Beginners: Open File Explorer, go to View > Options, and restore folder views by selecting "Reset Folders." This clears custom sorting and grouping. Advanced: Power users can reset Quick Access by deleting the file %AppData%\\Microsoft\\Windows\\Recent\\AutomaticDestinations. This wipes pinned and recent folder history.

8\. Reset Windows Services Customization Beginners: If you’ve changed services manually, open Services (services.msc), right-click a service, and set its Startup type back to "Automatic" or "Manual" as originally configured. Advanced: Run the command sc config start= auto in Command Prompt to restore default service startup settings.

9\. Use [Glary Utilities](https://www.glarysoft.com) to Clean System Tools Customizations Beginners: [Glary Utilities](https://www.glarysoft.com) offers an easy 1-Click Maintenance feature that clears temporary files, fixes invalid shortcuts, and resets broken system settings automatically. Advanced: The Advanced Tools section lets you clean registry entries related to system tools, manage startup items, and reset hidden Windows tweaks. This provides fine-grained control to restore defaults while improving performance.

10\. Reset Group Policy or Local Security Settings Beginners: If you’ve applied custom restrictions through Local Group Policy, run gpedit.msc, navigate to the modified settings, and change them back to "Not Configured." Advanced: Open Command Prompt as administrator and run gpupdate /force to refresh policies. For a complete reset, delete the contents of C:\\Windows\\System32\\GroupPolicy and reboot.

By cleaning up customizations across these ten system tools, Windows becomes easier to manage, faster to operate, and more predictable. Whether you are a beginner restoring defaults through simple menus or an advanced user working with the Registry and command-line utilities, these methods ensure your system remains optimized and clutter-free. [Glary Utilities](https://www.glarysoft.com) enhances this process by providing a comprehensive, user-friendly solution to manage and reset many of these settings in one place.
