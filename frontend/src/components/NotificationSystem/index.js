import React, { useEffect } from "react";
import MDAlert from "components/MDAlert";
import { useSelector } from "react-redux";
import MDTypography from "components/MDTypography";

const Notification = () => {
    const notification = useSelector((state) => state.notification);
    useEffect(() => {}, [notification]);

    if (notification.message) {
        return (
            <MDAlert color={notification.type} dismissible>
                <MDTypography variant="subtitle2" color="white">
                    {notification.message}
                </MDTypography>
            </MDAlert>
        );
    }
    return <></>;
};

export default Notification;
