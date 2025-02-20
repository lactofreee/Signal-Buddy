import { ReactNode } from "react";

export default function Layout({children}: {children: ReactNode

}){
    return (
    <div>
        <h1>나의 목적지</h1>
        {children}
    </div>
        )
}