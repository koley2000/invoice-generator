// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import puppeteer from 'puppeteer';
import invoiceTemplate from "./template/index";
import { Invoice } from "../../models/Invoice";

interface GeneratePdfRequest extends NextApiRequest {
  body: {
    invoice: Invoice;
  };
}

export default async (req: GeneratePdfRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { invoice } = req.body;

    if (!invoice) {
      return res.status(400).json({ message: "Invoice data is required" });
    }

    try {
      // Generate the PDF from the template
      const html = invoiceTemplate(invoice);

      // simulate a chrome browser with puppeteer and navigate to a new page
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      // set our compiled html template as the pages content
      // then waitUntil the network is idle to make sure the content has been loaded
      await page.setContent(html, { waitUntil: 'networkidle0' });

      // convert the page to pdf with the .pdf() method
      const pdf = await page.pdf({ format: 'A4', margin: {
        top: '10mm',
        right: '10mm',
        bottom: '10mm',
        left: '10mm',
      },
      printBackground: true,
     });
      await browser.close();

      // send the result to the client
      res.statusCode = 200;
      res.send(pdf);

    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};