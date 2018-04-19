import Vue from 'vue';
import AutoComplete from 'main.vue';

new Vue({
    el: '#app',
    components: {
        AutoComplete
    },
    data: {
        value: {AppId: 10861, AppCode: 'mjdz', AppType: 2},
        ContentJson: [
            {
                AppId: 10865, AppCode: 'wfbk', AppType: 2
            }, {
                AppId: 10865,
                AppCode: 'wfbk',
                AppType: 2
            }, {AppId: 10861, AppCode: 'mjdz', AppType: 2}, {
                AppId: 10865,
                AppCode: 'wfbk',
                AppType: 2
            }],
        appList: [
            {
                AppId: 10865,
                AppCode: 'wfbk',
                OS: 1,
                AppName: 'wfbk',
                DevId: 0,
                CheckPackageName: 'com.uc108.mobile.wfbk',
                AppType: 2,
                IconList: 'http://gsimg.tcy365.com/icon/undefined_80_1523934013.png,http://gsimg.tcy365.com/icon/undefined_130_1523934560.png'
            },
            {
                AppId: 10864,
                AppCode: 'fjdz',
                OS: 1,
                AppName: '飞机大战',
                DevId: 0,
                CheckPackageName: 'com.uc108.mobile.fjdz',
                AppType: 2,
                IconList: 'http://gsimg.tcy365.com/icon/undefined_80_1523846765.png,http://gsimg.tcy365.com/icon/undefined_130_1523846770.png'
            },
            {
                AppId: 10861,
                AppCode: 'mjdz',
                OS: 1,
                AppName: '萌菌大作战2',
                DevId: 0,
                CheckPackageName: 'com.uc108.mobile.mjdz.tcy',
                AppType: 2,
                IconList: 'http://gsimg.tcy365.com/icon/undefined_80_1523589393.png,http://gsimg.tcy365.com/icon/undefined_130_1523589399.png'
            },
            {
                AppId: 10860,
                AppCode: 'smbljzsy',
                OS: 1,
                AppName: '数码暴龙',
                DevId: 7000120,
                CheckPackageName: 'com.jz.cb.smbljzsy.tcy',
                AppType: 1,
                IconList: 'http://gsimg.tcy365.com/icon/undefined_80_1523346104.png,http://gsimg.tcy365.com/icon/undefined_130_1523346106.png'
            }
        ]
    }
});
