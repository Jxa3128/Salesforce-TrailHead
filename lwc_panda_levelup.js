import { LightningElement, track } from 'lwc';

export default class Lwc_panda_levelup extends LightningElement {
    title = "Stock Portfolio";

    showFeatures = true;

    @track positions =
    [
        {
            symbol: "IBM",
            qty: 120,
            price: 142.00
        },
        {
            symbol: "MSFT",
            qty: 220,
            price: 240.00
        },
        {
            symbol: "GE",
            qty: 120,
            price: 14.00
        },
    ];
    total = 0;

    finnHubUrl = 'https://finnhub.io/api/v1/quote';
    apiKey = 'c2vnlqqad3ifkigbsjrg';
    
    async getStockQuote(symbol){
        const url =`${this.finnHubUrl}?symbol=${symbol}&token=${this.apiKey}`;
        console.log('The url is: ' + url);
        const response = await fetch(url );
        const stockData = await  response.json();
        return stockData;
    }

    //handler for the Get Quotes button click
    async handleGetQuoteClick(){
        for(let i =0; i < this.positions.length; i++){
            const position = this.positions[i];
            const quoteData = await this.getStockQuote(position.symbol);
            this.positions[i].price = quoteData.c;
        };

        this.positions = [...this.positions]; //make data referenceable
        //reset total to zero
        this.total = 0;
        this.positions.forEach(pos => {
            this.total += pos.qty * pos.price;
        });

    }
}