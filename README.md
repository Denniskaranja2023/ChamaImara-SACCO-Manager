   # ChamaImara-SACCO-Manager

An efficient and convenient way for treasurers or managers of small and medium sized investment groups like SACCOs and Chamas to manage the financial data of their investment group members

By Dennis Karanja

## Description
ChamaImara is an elaborate financial manager for small and mid-sized investment groups that allows the manager or treasurer to manage members' financial data. A user is able to view the aggregated values of the investment group on the aggregation section. All the existing members with a summary of their details can be viewed in the summary section. An existing member's data can be edited through the Member detail section. A new member can be added through the Add New Member form. Lastly, the member share percentages can be viewed as a pie chart in the statistics section.

## Screenshots

![Aggregate-SummarySection](./img/aggregateSummary%20section.png)
![Detail-section](./img/detail%20section.png)
![NewMember-StatisticSection](./img/addNew%20Section.png)

## Features
1. Aggregate section.

   Whenever a new entry is made on an individual, this section aggregates the values of each member and updates to reflect the changes made on individual
2. Member Summary section

   Any existing or newly added members appear on this section with their current investment, debt,dividends and share percent displayed. A member may be deleted using delete button and their data edited by clicking the edit button. Once a member is deleted, any current debts are redistributed to existing members as total investments(to show their debt has been subtracted from their investments and redistributed to remaining members) as per their share percent
3. The Member Details section

   Once the edit button of a member is clicked, a form for the editing of their data appears in this section. You may input a new investment, debt or repayment and observe the values of members in the other sections update to reflect the inputs. Note that a new amount borrowed cannot be inputed if there are any outstanding debts. Also, a new amount borrowed may not be inputed for a member if the value exceeds 40% of their current investment. These are features that can be reengineered as per investment group policy
4. Add new Member Section

   In case of a new admission to the investment group, the new member data can be added in the form at this section. Once data is submitted, the new member appears on the summary section and all the other sections refresh to reflect their new investment
5. Statistics section

   A pie chart is generated as soon as there are any changes in the member investments. Each member share percent can be viewed by hovering over the pie chart
## How to use
### Requirements

To use this application, you will need a computer, tablet or phone and access to internet

### View Live site

You may access the live site of this application [here](https://denniskaranja2023.github.io/ChamaImara-SACCO-Manager/)
## Installation process

1. Clone this repository using
 
      ```git@github.com:Denniskaranja2023/ChamaImara-SACCO-Manager.git```

2. Navigate to the project directory
 
      ```cd ChamaImara-SACCO-Manager```

3. Open the index.html file to view contents of the page

      ``` open index.html```
## Technologies Used
JavaScript(ES6)

HTML & CSS
## Support and Contact details

For any questions, clarifications or suggestions, reach out by email through denniswanyeki2021@gmail.com

## License

### MIT License
Copyright (c) 2025 Denniskaranja2023

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.







