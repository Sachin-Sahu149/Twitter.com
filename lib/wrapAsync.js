

export const  wrapAsync = function(fn){
    console.log("wrapAsync called ");
    return function(req,res,next){
        fn(req,res,next).catch(next);
    }
}