import React from 'react';
import user5 from '../images/dashboard/user5.jpg';
import user3 from '../images/dashboard/user3.jpg';
import user1 from '../images/dashboard/user1.jpg';
import boy2 from '../images/dashboard/boy-2.png';
import designer from '../images/dashboard/designer.jpg';
import user from '../images/dashboard/user.png'

export const data = [
    {
        id: "1",
        avtar: <img src={user5} style={{ width: 50, height: 50 }} />,
        f_name: "Yao",
        l_name: "Christian",
        email: "djeachristian@gmail.com",
        tel: "07151781",
        last_login: "6 Days ago",
        state: 1
    },
    {
        id: "2",
        avtar: <img src={user3} style={{ width: 50, height: 50 }} />,
        f_name: "Eba",
        l_name: "Jean",
        email: "jeaneba.com",
        tel: "00000000",
        last_login: "2 Days ago",
        state: 0
    },
    {
        id: "3",
        avtar: <img src={user1} style={{ width: 50, height: 50 }} />,
        f_name: "Koffi",
        l_name: "Guillaume",
        email: "Lane.Skylar@gmail.com",
        last_login: "1 Days ago",
        tel: "00000000",
        state: 1
    },
    {
        id: "4",
        avtar: <img src={boy2} style={{ width: 50, height: 50 }} />,
        f_name: "Koffi",
        l_name: "Arsène",
        email: "Gray.Brody@gmail.com",
        tel: "00000000",
        last_login: "3 Days ago",
        state: 0
    },
]
export default data