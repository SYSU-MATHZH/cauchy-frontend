import React from 'react';
import useGlobalHook from 'use-global-hook';

import * as actions from "../actions";

let user = {
    url: null,
    username: null,
    token: null,
    status: 'AUTHED',
    activities: [
        {
            date: new Date("2019/6/11"),
            name: "海边捡垃圾",
            group: "16级应数班",
            description: "一个学术讲座",
            type: "公益时",
            status: "FINISHED",
            amount: 10
        }, {
            date: new Date("2019/6/10"),
            name: "山上捡垃圾",
            group: "16级应数班",
            description: "一个学术讲座",
            type: "公益时",
            status: "FINISHED",
            amount: 5
        }, {
            date: new Date("2019/6/9"),
            name: "学术讲座",
            group: "中珠数院",
            description: "一个学术讲座",
            type: "第二课堂",
            status: "FINISHED",
            amount: 8
        }, {
            date: new Date("2019/6/8"),
            name: "海边捡垃圾",
            group: "16级应数班",
            description: "一个学术讲座",
            type: "公益时",
            status: "FINISHED",
            amount: 2
        }, {
            date: new Date("2019/6/7"),
            name: "课外实践",
            group: "16级应数班",
            description: "一个学术讲座",
            type: "第二课堂",
            status: "FINISHED",
            amount: 5.5
        }, 
    ],
    pendingActivities: [
        {
            date: new Date("2019/8/14"),
            name: "海边捡垃圾",
            group: "16级应数班",
            type: "公益时",
            status: "PENDING",
            amount: 10
        }, {
            date: new Date("2019/8/15"),
            name: "山上捡垃圾",
            group: "16级应数班",
            type: "公益时",
            status: "PENDING",
            amount: 5
        }
    ],
    unfinishedActivities: [
        {
            name: "学术讲座",
            description: "一个学术讲座一个学术讲座一个学术讲座一个学术讲座一个学术讲座一个学术讲座一个学术讲座一个学术讲座一个学术讲座一个学术讲座",
            group: "16级应数班",
            type: "第二课堂",
            status: "UNSIGNED",
            date: new Date("2019/8/26"),
            place: "F307",
            amount: null
        }, {
            name: "捡垃圾",
            description: "一次捡垃圾活动",
            group: "16级应数班",
            type: "公益时",
            status: "SIGNED",
            date: new Date("2019/8/26"),
            place: "美丽湾",
            amount: null
        }
    ],
    unstartedActivities: [
        {
            name: "志愿者",
            description: "一次志愿服务",
            group: "16级应数班",
            type: "公益时",
            status: "UNSTARTED",
            date: new Date("2019/8/27"),
            amount: null
        }
    ],
    pendingApplications: [
        {
            date: new Date("2019/8/14")
        }
    ],
    pendingAppeals: [
    ]
};

const save = JSON.parse(localStorage.getItem('user'))
if (save) {
    user.url = save.url
    user.token = save.token
    user.status = 'AUTHED'
}

const initialState = {
    status: 'INITIAL',
    message: [],
    user: user,
    users: {},
    activities: {},
    years: [
        {
            begin: new Date("2019/8/25"),
            end: new Date("2020/8/31")
        },
        {
            begin: new Date("2018/9/1"),
            end: new Date("2019/8/24")
        }, {
            begin: new Date("2017/9/1"),
            end: new Date("2018/8/31")
        }, {
            begin: new Date("2016/9/1"),
            end: new Date("2017/8/31")
        }
    ]
};

const useGlobal = useGlobalHook(React, initialState, actions);

export { useGlobal };