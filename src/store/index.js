import React from 'react';
import useGlobalHook from 'use-global-hook';

import * as actions from "../actions";

let user = {
    url: null,
    username: "Nouzan",
    token: "asfggg",
    status: 'INITIAL',
    activities: [
        {
            date: new Date("2019.6.11"),
            name: "海边捡垃圾",
            group: "16级应数班",
            type: "公益时",
            amount: 10
        }, {
            date: new Date("2019.6.10"),
            name: "山上捡垃圾",
            group: "16级应数班",
            type: "公益时",
            amount: 5
        }, {
            date: new Date("2019.6.9"),
            name: "学术讲座",
            group: "中珠数院",
            type: "第二课堂",
            amount: 8
        }, {
            date: new Date("2019.6.8"),
            name: "海边捡垃圾",
            group: "16级应数班",
            type: "公益时",
            amount: 2
        }, {
            date: new Date("2019.6.7"),
            name: "课外实践",
            group: "16级应数班",
            type: "第二课堂",
            amount: 5.5
        }, 
    ],
    pendingActivities: [
        {
            date: new Date("2019.8.14"),
            name: "海边捡垃圾",
            group: "16级应数班",
            type: "公益时",
            amount: 10
        }, {
            date: new Date("2019.8.15"),
            name: "山上捡垃圾",
            group: "16级应数班",
            type: "公益时",
            amount: 5
        }
    ],
    pendingApplications: [
        {
            date: new Date("2019.8.14")
        }
    ],
    pendingAppeals: [
    ]
};

const initialState = {
    status: 'INITIAL',
    message: [],
    user: user,
    users: [],
    activities: [],
    years: [
        {
            begin: new Date("2019.8.25"),
            end: new Date("2020.8.31")
        },
        {
            begin: new Date("2018.9.1"),
            end: new Date("2019.8.24")
        }, {
            begin: new Date("2017.9.1"),
            end: new Date("2018.8.31")
        }, {
            begin: new Date("2016.9.1"),
            end: new Date("2017.8.31")
        }
    ]
};

const useGlobal = useGlobalHook(React, initialState, actions);

export default useGlobal;