import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function ErrorPage() {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/QuienesSomos');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div>
            {visible && (
                <>
                    <h1>Page Not Found</h1>
                    <h1>The page you are looking for does not exist.</h1>
                </>
            )}
        </div>
    );
}

export default ErrorPage;
