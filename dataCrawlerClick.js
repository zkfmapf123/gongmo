import stringify from "csv-stringify/lib/sync";
import puppeteer from "puppeteer";
import fs from "fs";
import axios from "axios";

//직접 긁어오기...
const cralwer = async()=>{
    try{
        const result = [];
        const pages=[];

        const browser = await puppeteer.launch({ headless: false});
        const page = await browser.newPage();
        await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36");
        await page.setViewport({ width : 1280, height: 960});
        await page.goto("https://www.wevity.com/");

        await page.click(".f a");
        await page.click(".tit a");
        await page.waitForNavigation();

        /*
        await page.evaluate(()=>{
            pages = document.querySelectorAll(".tit a");
        });
        */
        await page.close();
        await browser.close();

    //const str = stringify(result);
    //fs.writeFileSync(`csv/data.csv`,str);
    
    }catch(error){
        console.error(error);
    }
}

cralwer();

//들어가서 자동적으로 한페이지 당 15개의 게시물이니까
//그것을 읽어서 자동적으로 csv에 읽어들인가 로직을 짜보자...