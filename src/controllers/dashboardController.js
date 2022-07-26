 const startedPage =(req,res)=>{
    res.render("welcome");
 }

 const getDashboardPage =(req,res)=>{
    res.render("dashboard", {user:req.user});
 }

 module.exports={
    startedPage,
    getDashboardPage
 }