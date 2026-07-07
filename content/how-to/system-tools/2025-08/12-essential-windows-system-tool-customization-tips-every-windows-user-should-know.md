---
title: "12 Essential Windows system tool customization Tips Every Windows User Should Know"
date: "2025-08-14"
author: "Jarx"
categories: 
  - "system-tools"
---

Windows is packed with powerful system tools that are more capable than most users realize. With a few targeted customizations, these tools can surface the right data faster, automate routine maintenance, and reduce troubleshooting time. The following 12 tips focus on practical, intermediate-level adjustments used by professionals to keep systems responsive and predictable.

1) How can Task Manager be customized to surface the real bottlenecks? Task Manager is more than a process killer; configured well, it becomes a performance triage board.

Steps 1. Open Task Manager (Ctrl+Shift+Esc). In Windows 11, select Settings in the left rail. 2. Set Default start page to Processes or Performance, depending on how you diagnose. 3. Turn on Always on top to keep it visible during reproductions. 4. In Processes, right-click a column header and enable: Power usage, Power usage trend, GPU engine, Disk I/O, and Command line. These help spot background updaters, GPU-bound tabs, and services. 5. In Details, right-click a column header and add I/O read bytes, I/O write bytes, and CPU time. Then choose Select columns and check Elevated to see which apps run as admin. 6. In Startup, sort by Startup impact and Last BIOS time to spot slow boot contributors. Disable non-critical items with High impact.

Real-world example A laptop feels hot and the fan runs constantly while browsing. Add Power usage trend and GPU engine columns, sort by Power usage trend, and identify a browser tab’s GPU subprocess pegging the GPU. Ending just that process cools the system without killing the whole browser.

Glary Utilities tie-in Glary Utilities complements Task Manager by offering a Startup Manager with delayed start and impact ratings, letting you reduce boot time without removing an app entirely.

2) How do you create a high-signal Event Viewer Custom View? Event Viewer is noisy by default. Custom Views filter for what matters.

Steps 1. Press Win+R, type eventvwr.msc, Enter. 2. Right-click Custom Views, select Create Custom View. 3. Set Logged to Last 7 days, Level to Critical, Error, Warning. 4. Check Windows Logs: System and Application. 5. In Event sources, select disk, diskio, Ntfs, Service Control Manager, Kernel-Power, DistributedCOM. Add application-specific sources you care about. 6. Click XML tab and check Edit query manually for fine-tuning later, then Save as “Core System Issues”. 7. Right-click your new view, choose Export Custom View to reuse it across machines.

Pro tip Add a second view for “Boot Degradation” focusing on Event ID 100–199 (Diagnostics-Performance) to analyze slow boots.

3) How do you build reusable Performance Monitor views and Data Collector Sets? Performance Monitor (perfmon) gives structured time-series data that survives reboots and can be reviewed later.

Steps: Create a live view 1. Press Win+R, type perfmon, Enter. 2. Click Performance Monitor, then the green plus button. 3. Add counters: - Processor(\_Total)\\% Processor Time - Memory\\Available MBytes - PhysicalDisk(\_Total)\\Avg. Disk Queue Length - LogicalDisk(\_Total)\\% Free Space - Network Interface(\*)\\Bytes Total/sec 4. Right-click the graph, choose Properties, set Sample every to 2 seconds and View to Report for exact numbers. 5. Right-click the graph, Save Data as a .htm or .csv report for snapshots.

Steps: Create a Data Collector Set 1. In Data Collector Sets, right-click User Defined, New, Data Collector Set. 2. Name it “Baseline – Weekly”, Create manually, Next. 3. Choose Performance counter, Next, Add the counters above, set Sample interval to 15 seconds. 4. Choose a log location on a data drive (e.g., D:\\PerfLogs). 5. Set Run as to a dedicated “PerfLog” local admin account if available. 6. After creation, right-click the set, choose Properties, Stop Condition: Overall duration 2 hours. 7. Right-click, Start to run on-demand or schedule it via Task Scheduler.

Real-world example A workstation stutters when syncing cloud files. The log shows Disk Queue Length spikes correlating with Network Interface bursts, pointing to large sync batches saturating disk I/O. Throttling the sync app during work hours resolves it.

4) What Resource Monitor filters make disk and network troubleshooting faster? Resource Monitor (resmon) exposes per-file and per-connection insights that Task Manager can’t.

Steps 1. Press Win+R, type resmon, Enter. 2. CPU tab: Right-click a process and choose Analyze Wait Chain to find blocking parent processes. 3. Disk tab: Check Disk Activity, click a suspected process to filter I/O to just that app and see exactly which files are slow. 4. Network tab: Sort by Send (B/sec) or Receive (B/sec), then expand TCP Connections to find remote endpoints and latency. 5. Memory tab: Watch Hard faults/sec while reproducing a slow scenario; frequent faults suggest memory pressure.

Real-world example Streaming stutters while a backup runs. Disk tab shows the backup holding open a large .vhdx file with high write I/O. Scheduling the backup outside active hours fixes the stream.

5) How do you control startup safely using Autoruns and Glary Utilities? Boot slowness is often caused by overly eager updaters and shell extensions.

Autoruns (Sysinternals) steps 1. Download Autoruns from Microsoft and run as admin. 2. Options menu: Check Hide Microsoft entries and Verify code signatures. 3. Ctrl+F for “Error” or “File not found” to spot broken entries; uncheck them to disable. 4. Review Logon, Scheduled Tasks, Services, Drivers, Explorer tabs. Uncheck non-essential items from trusted vendors to test impact. 5. Right-click an item, Jump to Entry to see its registry path or file location.

[Glary Utilities](https://www.glarysoft.com) steps 1. Open Glary Utilities, go to Startup Manager. 2. Review the list with vendor, rating, and boot impact. 3. Use Delay to postpone heavy apps by 30–120 seconds, smoothing the login storm without disabling the feature entirely. 4. Use the Scheduled Tasks view to spot hidden updaters that don’t appear in Startup.

6) How do you schedule low-impact health checks with Task Scheduler? Automating diagnostics ensures issues surface before users notice them.

Create a DISM health scan task 1. Press Win+R, type taskschd.msc, Enter. 2. Action: Create Task. 3. General: Name “Weekly DISM Scan”, check Run with highest privileges. 4. Triggers: New, Weekly, choose day/time when the machine is on but idle. 5. Conditions: Check Start the task only if the computer is idle and Stop if the computer ceases to be idle; Power tab: Start only if on AC power (laptops). 6. Actions: New, Program/script: dism, Arguments: /Online /Cleanup-Image /ScanHealth 7. OK to save. Monitor History tab for results.

Glary Utilities alternative Glary Utilities can schedule 1-Click Maintenance to run Disk Cleaner, Registry Cleaner, Shortcut Fixer, and Spyware Remover during idle time. Configure exclusions for developer folders and large working directories to avoid deleting useful caches.

7) How do you tame Services without breaking dependencies? Services can be tuned, but changes must respect dependencies and vendor guidance.

Steps 1. Press Win+R, type services.msc, Enter. 2. View menu: Add columns for PID and Description; sort by Startup Type and Status. 3. For third-party services you understand, double-click and set Startup type to Automatic (Delayed Start) to reduce boot contention. 4. Recovery tab: Set First failure and Second failure to Restart the Service for resilient, non-critical services. 5. Dependencies tab: Confirm no essential components rely on the service before changing it. 6. To analyze per-service usage, note the PID and match it in Task Manager’s Details tab to see CPU/RAM.

Real-world example A printer helper service consumes CPU during login. Setting it to Automatic (Delayed Start) defers initialization until after the desktop is responsive, improving perceived startup time without losing functionality.

8) How do you create a one-stop admin console with MMC? The Microsoft Management Console can combine your most-used snap-ins into one window.

Steps 1. Press Win+R, type mmc, Enter. 2. File, Add/Remove Snap-in. 3. Add: Event Viewer, Services, Device Manager, Task Scheduler, Performance Monitor. 4. Arrange panes under Console Root for quick access. 5. File, Options, set Console mode to User mode – full access to allow basic navigation without editing structure. 6. File, Save As, name it AdminTools.msc and store it in a tools folder or pin it to Start/Taskbar.

Benefit A single console reduces context switching and preserves your preferred ordering and views.

9) How do you make Windows Terminal and PowerShell work your way? Customizing the shell boosts speed and consistency in administrative tasks.

Windows Terminal steps 1. Open Windows Terminal, Ctrl+, to open Settings. 2. Set Default profile to PowerShell 7 (install from Microsoft Store if not present). 3. Appearance: Choose a high-contrast color scheme, enable Acrylic with 10–15% opacity, and set Font face to a developer-friendly font like Cascadia Mono. 4. Profiles: For PowerShell, set Starting directory to %USERPROFILE% or a work folder. 5. Actions: Add a key binding to split panes, e.g., { "command": "splitPane", "keys": "alt+-" }.

PowerShell profile steps 1. In Terminal’s PowerShell, run: if (!(Test-Path $PROFILE)) { New-Item -Type File -Path $PROFILE -Force } 2. Open the profile file: notepad $PROFILE 3. Add: Set-PSReadLineOption -PredictionSource HistoryAndPlugin Set-PSReadLineOption -EditMode Windows Import-Module PSReadLine function prompt { "PS " + $(Get-Location) + "> " } 4. Save and restart Terminal to apply.

Result You get command prediction, consistent prompts, and quick pane management for multitasking.

10) How do you tune Storage Sense and complement it with [Glary Utilities](https://www.glarysoft.com)? Storage hygiene prevents slowdowns and frees SSD space.

Storage Sense steps 1. Settings > System > Storage, turn on Storage Sense. 2. Configure cleanup schedule: Every week or Every month for most systems. 3. Temporary files: Check Delete temporary files that apps aren’t using. 4. Downloads: Choose 30 or 60 days retention only if Downloads is not used as a working directory. 5. Cloud content: Enable content to become online-only after 30–60 days for OneDrive-backed files. 6. Click Run Storage Sense now after major updates or software removals.

Glary Utilities enhancements - Disk Cleaner removes residual app caches more thoroughly and allows folder-level exclusions. - Duplicate Files Finder identifies large duplicates across drives with hash-based scanning. - Disk Space Analyzer visualizes space usage to target large, forgotten folders. - Scheduler automates cleanups, and you can set safe lists to preserve archives and dev caches.

11) How do you declutter File Explorer and the right-click menu? Cleaner navigation means fewer clicks and fewer shell extension conflicts.

File Explorer steps 1. Open any folder, View: enable Details, enable File name extensions and Hidden items. 2. Options (three dots > Options): - General tab: Clear File Explorer history to reset Quick Access clutter. - View tab: Uncheck Hide extensions for known file types; check Show encrypted or compressed NTFS files in color for quick visual cues. 3. Pin frequently used folders to Quick Access; unpin noisy ones. 4. Customize Send to: Press Win+R, type shell:sendto, add or remove shortcuts for destinations you actually use.

Context menu cleanup with Glary Utilities 1. Open Glary Utilities, Tools, Context Menu Manager. 2. Disable non-essential shell extensions, especially entries that duplicate existing options or come from outdated software. 3. Test by right-clicking files of different types to ensure critical options remain.

12) How do you use Reliability Monitor as a high-level health dashboard? Reliability Monitor condenses critical events, app failures, and driver crashes into a daily stability score.

Steps 1. Press Win+R, type perfmon /rel, Enter. 2. Use the timeline to spot days with red X icons. Click a day to list Critical events, Warnings, and Information. 3. View technical details on recurring Application Failures to identify a bad add-in or plugin. 4. Check Windows Failures for hardware or driver issues, such as LiveKernelEvent events that often point to GPU or storage drivers. 5. Select Save reliability history to export a .xml snapshot during troubleshooting or after major changes.

Real-world example A system shows periodic crashes around 10 a.m. Reliability Monitor reveals a repeating Application Failure tied to a PDF preview handler. Updating that specific shell extension stops the crashes.

Putting it together with a maintenance baseline - Use a Custom View in Event Viewer for weekly triage and Reliability Monitor for trend lines. - Let Storage Sense handle routine temp cleanup while Glary Utilities performs deeper, scheduled cleans and startup optimization with safe delays. - Keep a reusable MMC console and a Performance Monitor Data Collector Set for consistent diagnostics. - Maintain a tuned Task Manager, Resource Monitor filters, and a customized Windows Terminal to accelerate analysis when issues appear.

These customizations turn built-in tools into a cohesive, low-friction workflow, reducing time-to-diagnosis and sustaining performance over the long term.
