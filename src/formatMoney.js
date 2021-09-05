export const formatMoney = (inum) => {  // ฟังก์ชันสำหรับแปลงค่าตัวเลขให้อยู่ในรูปแบบ เงิน
    var s_inum = new String(inum);
    var num2 = s_inum.split(".");
    var n_inum = "";
    if (num2[0] != undefined) {
        var l_inum = num2[0].length;
        for (let i = 0; i < l_inum; i++) {
            if (parseInt(l_inum - i) % 3 == 0) {
                if (i == 0) {
                    n_inum += s_inum.charAt(i);
                } else {
                    n_inum += "," + s_inum.charAt(i);
                }
            } else {
                n_inum += s_inum.charAt(i);
            }
        }
    } else {
        n_inum = inum;
    }
    if (num2[1] != undefined) {
        n_inum += "." + num2[1];
    }
    return n_inum;
}