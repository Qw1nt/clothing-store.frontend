import{R as a,ak as s}from"./entry.be01013c.js";var n=(t=>(t.User="User",t.Admin="Admin",t.Manager="Manager",t))(n||{});class u extends a{constructor(e){super("user",e)}async getUserInfo(e){const r=new s;return await this.httpClient.get("",e,[r])}async getOrderHistory(e){const r=new s;return await this.httpClient.get("order/history",e,[r])}}export{n as U,u as a};
