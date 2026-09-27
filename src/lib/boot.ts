export const BOOT_SEEN_KEY = "boot-screen-seen"

// Inlined into <head>: marks <html> before first paint when the boot screen has
// already played this session, so CSS can hide it without waiting for React.
export const BOOT_SEEN_SCRIPT = `try{if(sessionStorage.getItem("${BOOT_SEEN_KEY}"))document.documentElement.setAttribute("data-boot-seen","")}catch(e){}`
