import express from "express";

const app = express();

app.use(express.json());


// DeepSeek API接口
app.post("/api/wish", async(req,res)=>{

    const wish = req.body.wish;


    try{

        const response = await fetch(
            "https://api.deepseek.com/chat/completions",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":
                    "Bearer "+process.env.DEEPSEEK_API_KEY
                },

                body:JSON.stringify({

                    model:"deepseek-chat",

                    messages:[
                        {
                            role:"system",
                            content:"You generate creative wishes."
                        },
                        {
                            role:"user",
                            content:"My wish: "+wish
                        }
                    ]

                })
            }
        );


        const data = await response.json();


        res.json({
            text:data.choices[0].message.content
        });


    }catch(error){

        res.status(500).json({
            error:error.message
        });

    }

});


// 托管网页
app.use(express.static("."));


const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(
      `Server running on ${PORT}`
    );
});
