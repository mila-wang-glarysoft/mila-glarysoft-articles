---
title: "Top 10 Ways to Clean Windows Using Command Line Tools in Windows 10 &amp; 11"
date: "2025-06-09"
author: "Finn"
categories: 
  - "system-tools"
---

Many Windows users are familiar with cleaning up their system using built-in graphical tools, but few realize how powerful and efficient the Windows command line can be for these tasks. For beginners, mastering a few simple commands can help keep your PC running smoothly. This guide explores the top 10 ways to clean and maintain your Windows 10 or 11 system using command line tools, complete with real-world examples and practical advice.

Why Use Command Line Tools for System Cleaning?

Command line tools are fast, require fewer resources, and can be used remotely or in automation scripts. They’re also less likely to hang up like some graphical utilities. While these tools are powerful, they’re safe for beginners when used as shown below.

1\. How to Open the Command Prompt as Administrator

Most cleaning commands require elevated permissions.

Step-by-step: - Press Windows Key, type “cmd” - Right-click “Command Prompt” and choose “Run as administrator”

For PowerShell, replace “cmd” with “powershell”.

2\. How to Clear the Temp Folder

Windows stores temporary files here, which can waste space over time.

Step-by-step: - In Command Prompt, type: del /q/f/s %TEMP%\\\* - Press Enter. This deletes all files in your temporary folder.

3\. How to Use Disk Cleanup from Command Line

Disk Cleanup (cleanmgr) is a classic tool.

Step-by-step: - Type: cleanmgr /sageset:1 - Check which files you want to clean (e.g., recycle bin, temp files), then click OK. - Then type: cleanmgr /sagerun:1

This runs Disk Cleanup with your saved settings.

4\. How to Empty the Recycle Bin

It’s easy to clear the Recycle Bin from the command line.

Step-by-step: - For Command Prompt: rd /s /q %systemdrive%\\$Recycle.Bin - For PowerShell: Clear-RecycleBin -Force

5\. How to Uninstall Unnecessary Apps

You can remove built-in or unwanted apps using PowerShell.

Step-by-step: - Launch PowerShell as Administrator. - Type (for example, to remove Xbox app): Get-AppxPackage \*xbox\* | Remove-AppxPackage

This helps declutter your system.

6\. How to Clean Windows Update Files

Old update files can consume gigabytes of space.

Step-by-step: - Type: net stop wuauserv - Then: del /q/f/s %windir%\\SoftwareDistribution\\Download\\\* - Finally: net start wuauserv

This clears update downloads without harming your system.

7\. How to Remove Old Restore Points

System restore points can use up disk space.

Step-by-step: - Type: vssadmin delete shadows /for=c: /oldest - To remove all: vssadmin delete shadows /for=c: /all

8\. How to Run the System File Checker (SFC)

SFC repairs corrupt system files that can slow down your PC.

Step-by-step: - Type: sfc /scannow - Wait for the scan and follow instructions if any problems are found.

9\. How to Use DISM to Clean WinSxS Folder

DISM can help clean up unnecessary files from the WinSxS folder.

Step-by-step: - Type: Dism.exe /Online /Cleanup-Image /StartComponentCleanup

This reclaims space by removing superseded updates.

10\. How to Automate Cleaning With Batch Files

Combine commands in a text file and run it as a batch for regular cleaning.

Example: - Open Notepad, paste commands from above (e.g., for temp files and recycle bin). - Save as CleanPC.bat - Right-click and “Run as administrator” when cleaning is needed.

Why Consider [Glary Utilities](https://www.glarysoft.com) for Windows Cleaning?

While command line tools are powerful and efficient, beginners may still find some steps daunting or prefer a graphical approach. Glary Utilities offers a user-friendly interface that combines many of these cleaning tasks—like disk cleanup, registry repair, uninstalling apps, and more—into a single, easy-to-use suite. For beginners who want safe, one-click maintenance without learning commands, [Glary Utilities](https://www.glarysoft.com) is an excellent companion to these command line methods.

In summary, these command line techniques give you fast, flexible, and effective ways to clean Windows 10 and 11. Practice each command carefully, and consider combining them with system tools like [Glary Utilities](https://www.glarysoft.com) for the best results in keeping your PC clutter-free and running smoothly.
