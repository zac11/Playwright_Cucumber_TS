import { chromium, firefox, LaunchOptions, webkit } from "@playwright/test";


const options : LaunchOptions ={
    headless: false,
    slowMo: 200
}

export const invokeBrowser = () =>{
    const browserType = process.env.BROWSER
    switch (browserType) {
        case "chromium":
                return chromium.launch(options);
        case "firefox":
                return firefox.launch(options)
        case "webkit":
                return webkit.launch(options)
    
       
        default:
            throw new Error("Please select the proper browser");
    }
}