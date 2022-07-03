import React, { useEffect } from "react";
import MDAlert from "components/MDAlert";
import { useSelector } from "react-redux";

const Notification = () => {
    const notification = useSelector((state) => state.notification);
    useEffect(() => {}, [notification]);

    if (notification.message) {
        return (
            <MDAlert color={notification.type} dismissible>
                {notification.message}
            </MDAlert>
        );
    }
    return <></>;
};

export default Notification;
