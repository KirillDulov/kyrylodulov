import React, { useState, useEffect } from "react";

export default function MessageComponent({ promise }) {
    const [message, setMessage] = useState(" Завантаження...");

    useEffect(() => {
        let isMounted = true;

        promise.then((result) => {
            if (isMounted) setMessage(result);
        });

        return () => {
            isMounted = false;
        };
    }, [promise]);

    return (
        <div>
            <h2>Повідомлення:</h2>
            <p>{message}</p>
        </div>
    );
}