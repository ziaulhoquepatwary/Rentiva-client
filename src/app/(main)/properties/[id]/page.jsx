import PropertyDetailsContent from "./PropertyDetailsContent";
import ProtectedRoute from "@/utils/ProtectedRoute";

async function PropertyDetailsPage({ params }) {
    const resolvedParams = await params;
    return (
        <ProtectedRoute>
            <PropertyDetailsContent id={resolvedParams.id} />
        </ProtectedRoute>
    )
}

export default PropertyDetailsPage