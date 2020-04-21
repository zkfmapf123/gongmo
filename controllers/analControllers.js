export const getAnalTotal = (req,res)=>{
    const posts = [];
    res.render("analTotal",{posts});
}

export const postAnalTotal = (req,res)=>{
    console.log("postAnalTotla");
    console.log(req.body);
    
    //찾아서 넣어주면 된다.
}