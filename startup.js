function mp_event_loop() {
  var wait = 0;
  do {
    var e = mp.wait_event(wait);
    if (e.event == "shutdown") exit();
    if (e.event == "file-loaded") {
      wait = 0;
      mp.dispatch_event(e);
      mp.command_native([
        "run",
        "node",
        mp.get_script_file() + "/../../node-scripts/mpv-dsc-ipc/index.js",
        mp.get_script_file() + "/../../",
      ]);
    } else {
      wait = mp.process_timers() / 1000;
      if (wait != 0) {
        mp.notify_idle_observers();
        wait = mp.peek_timers_wait() / 1000;
      }
    }
  } while (mp.keep_running);
}