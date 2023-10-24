import { CreateIssue } from "./CreateIssue"
import { CreateProductCard } from "./CreateProductCard"

export const Admin=()=>{

    return(<>
        <div className="text-white text-4xl">
            Администратор
        </div>
    <CreateProductCard/>
    <CreateIssue/>
    </>)
}