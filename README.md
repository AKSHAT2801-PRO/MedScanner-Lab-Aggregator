# MedScanner-Lab-Aggregator
Build a basic full-stack web application that allows a user to search for a lab test in a specific pincode, and see the results sorted by the true lowest price.

⚡ Quick Start

For someone who already has Git and Node.js installed, the complete setup is simply:

git clone https://github.com/AKSHAT2801-PRO/MedScanner-Lab-Aggregator.git
cd MedScanner-Lab-Aggregator
npm install
npm run dev

That's it! 🎉

Detailed Step By Step Guide:
How to Run Locally

Follow these simple steps to run the application on your local machine.

1. Clone the GitHub Repository

Clone the repository into an empty folder:
git clone https://github.com/AKSHAT2801-PRO/MedScanner-Lab-Aggregator.git

2. Change Directory

Move into the project directory:
cd MedScanner-Lab-Aggregator

3. Install Dependencies
Run:
npm install

This installs the required root dependencies.

4. Start the Application
Run:
npm run dev

This command will automatically:

Install Frontend dependencies
Install Backend dependencies
Start the Frontend server
Start the Backend server

Both servers will run simultaneously.

5. Use the Application

Once the application starts, open the Frontend URL shown in the terminal.

You can then search for a lab test by entering the test name and pincode.

## 🔄 Aggregator Logic

The application uses an aggregation function to find and rank the most relevant lab test providers based on the user's **test name** and **pincode**.

### How It Works

1. **Filter by Pincode**
   
   The system first checks whether the requested pincode is available in each provider's `available_pincodes` list.

2. **Filter by Test Name**
   
   It then checks whether the requested test exists in the provider's `included_tests` list.

3. **Calculate the True Price**
   
   For every matching provider, the actual payable price is calculated as:

   ```text
   True Price = Offer Price + Home Collection Fee