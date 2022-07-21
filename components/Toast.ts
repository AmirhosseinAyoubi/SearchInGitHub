import { toast,Slide } from 'react-toastify';

// react toastify for show alert


// @ts-ignore
export const notify = (text:string, toastType:any) => toast[toastType](text,{
    transition: Slide,
    autoClose:3000
});