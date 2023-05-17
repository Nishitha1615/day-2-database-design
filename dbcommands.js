// show dbs;  //TO SHOW THE DATABASE PRESENT IN MONGOCOMPOS

// use dbtask; // TO CREATE THE FILE IN MONGOCOMPOS

db.topics.insertMany([
{Javascript:"loops",React:"components",Node:"arcitecture of node",month:"January",date:"16 jan-2023"},
{Javascript:"functions",React:"hooks",Node:"arcitecture of node",month:"February",date:"19 feb-2023"},
{Javascript:"functions",React:"install packages in react",Node:"reading the file",month:"May",date:"20 May-2023"},
{Javascript:"filter methods",React:"navigation",Node:"crud operation",month:"October",date:"31 oct-2023"},
{Javascript:"itrate json data",React:"advantages of react",Node:"read/write file",month:"April",date:"29 April-2023"},
{Javascript:"types of functions",React:"component cycle",Node:"installations",month:"October",date:"24 oct-2023"},
{Javascript:"Array Methods",React:"types of components",Node:"input output file",month:"March",date:"23 March-2023"},
{Javascript:"functions",React:"hooks",Node:"arcitecture of node",month:"February",date:"19 feb-2023"},
{Javascript:"functions",React:"hooks",Node:"arcitecture of node",month:"February",date:"19 nov-2023"}]);

db.task.insertMany([{topics:"node",deployment:"Backend",Submission:"submitted",period:"October",date:"15 oct-2023"},
{topics:"react",deployment:"frontend",Submission:"not submitted",period:"May",date:"10 oct-2023"},
{topics:"mongodb",deployment:"Backend",Submission:"not submitted",period:"October",date:"14 oct-2023"},
{topics:"Javascript",deployment:"frontend",Submission:"not submitted",period:"October",date:"22 oct-2023"}])

db.Company.insertMany([{company:"Infosys",location:"Bangalore" ,duration:new Date("2020-10-17") ,appearence:"appeared",Jobrole:"Software role"},
{company:"Wipro",location:"Noida",duration:new Date("2020-10-20"),Placement:"appeared",Jobrole:"Backend developer"},
{company:"Zoho",location:"Bangalore",duration:new Date("2020-10-10"),Placement:"not appeared",Jobrole:"Testing"},
{company:"SAP",location:"Noida",duration:new Date("2020-03-17"),Placement:"appeared",Jobrole:"FrontEnd Developer"},
{company:"Cisco",location:"Bangalore",duration:new Date("2020-10-31"),Placement:" not appeared",Jobrole:"Software role"},
{company:"Adobe",location:"Noida",duration:new Date("2020-07-17"),Placement:"appeared",Jobrole:"Nods ja developer"},
{company:"Accenture",location:"pune",duration:new Date("2020-10-22"),Placement:"not appeared",Jobrole:"Software role"}])


db.Students.insertMany([{userid:"01",name:"shree",education:"btech",Placement:"appeared",attendence:"present",ProbleCount:10},
{userid:"02",name:"Ankitha",education:"btech",Placement:"appeared",attendence:"absent",ProbleCount:4},
{userid:"03",name:"Rahul",education:"BCA",Placement:"not appeared",attendence:"present",ProbleCount:0},
{userid:"04",name:"Hasani",education:"btech",Placement:"appeared",attendence:"present",ProbleCount:12},
{userid:"05",name:"ritik",education:"MBA",Placement:"not appeared",attendence:"absent",ProbleCount:5},
{userid:"06",name:"Harsha",education:"btech",Placement:"not appeared",attendence:"present",ProbleCount:15},
{userid:"07",name:"saloni",education:"BCA",Placement:"appeared",attendence:"absent",ProbleCount:2}])


db.Codekata.insertMany([{problem:"Array",challengeTookByUser:[{userid:"01",status:"solved",duration:new Date("2020-10-20")},
{userid:"02",status:"unsolved",duration:new Date("2020-10-20")},
{userid:"03",status:"solved",duration:new Date("2020-10-10")},
{userid:"04",status:"unsolved",duration:new Date("2020-10-19")},
{userid:"05",status:"solved",duration:new Date("2020-10-23")}]},

{problem:"DSA",challengeTookByUser:[{userid:"01",status:"solved",duration:new Date("2020-10-18")},
{userid:"02",status:"unsolved",duration:new Date("2020-11-20")},
{userid:"04",status:"solved",duration:new Date("2020-10-26")},
{userid:"06",status:"unsolved",duration:new Date("2020-10-31")},
{userid:"03",status:"solved",duration:new Date("2020-10-06")}]}])


db.Mentors.insertMany([{mentor_id:"01",name:"jhon",menteeCount:12,subjectCount:4},
{mentor_id:"01",name:"Rahul",menteeCount:18,subjectCount:2},
{mentor_id:"01",name:"Hasani",menteeCount:15,subjectCount:4},
{mentor_id:"01",name:"Nitin",menteeCount:2,subjectCount:7},
{mentor_id:"01",name:"Shurika",menteeCount:20,subjectCount:1},
{mentor_id:"01",name:"Anjali",menteeCount:9,subjectCount:8},
{mentor_id:"01",name:"Rohit",menteeCount:1,subjectCount:3}])



//Q1) Find all the topics and tasks which are thought in the month of October.
 db.topics.aggregate([
  {
    '$match': {
      'ProbleCount': 'October'
    }
  }, {
    '$lookup': {
      'from': 'task', 
      'localField': 'month', 
      'foreignField': 'period', 
      'as': 'inventory_docs'
    }
  }
] ).pretty();

//Q2) Find all the company drives which appeared between 15 oct-2020 and 31-oct-2020
db.Company.find({
  duration: {
      $gte: ISODate("2020-10-15T00:00:00.000Z"),
      $lt: ISODate("2020-10-31T00:00:00.000Z")
  }
}).pretty();

// Q3)Find all the company drives and students who are appesred for the placement.
db.Company.aggregate([
  {
    '$match': {
      'Placement': 'appeared'
    }
  }, {
    '$lookup': {
      'from': 'Students', 
      'localField': 'Placement', 
      'foreignField': 'Placement', 
      'as': 'inventory_docs'
    }
  }
] ).pretty();

//Q4)Find the number of problems solved by the user in codekata.
db.Students.find({"userid":"01"},{"ProblemCount": 1,"_id":0})


//Q5)Find all the mentors with who has the mentee's count more than 15
db.Mentors.find( { menteeCount: { $gt:15 } } ).pretty();


//Q6)Find the numbers of users who are absent and task is not submitted between 15 oct-2020 and 31 oct-2020

db.Students.aggregate([
  {
    '$match': {
      'attendence': 'absent'
    }
  }, {
    '$lookup': {
      'from': 'task', 
      'localField': '_id', 
      'foreignField': 'student_id', 
      'as': 'result'
    }
  }, {
    '$match': {
      'result': {
        '$elemMatch': {
          'Submission': 'not submitted'
        }
      }
    }
  }
]).pretty()

