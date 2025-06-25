import React, { useState } from "react";
import { Table, Select, Button } from "@mantine/core";

interface FieldMappingProps {
	uploadedData: { [key: string]: unknown }[]; // Add prop for uploaded data
}

const FieldMapping: React.FC<FieldMappingProps> = ({ uploadedData }) => {
	const predefinedFields = ["Name", "Age", "Address", "Email"]; // Example predefined fields
	const columnNames =
		uploadedData.length > 0
			? Object.values(uploadedData[3]).map((value) => value?.toString() || "")
			: []; // Extract column names from the first row's values

	const [mapping, setMapping] = useState<{ [key: string]: string }>({}); // State to store field-to-column mapping
	console.log("Column Names:", columnNames, uploadedData); // Log column names for debugging
	const handleMappingChange = (field: string, column: string) => {
		setMapping((prev) => ({ ...prev, [field]: column }));
	};

	return (
		<div>
			<Table>
				<thead>
					<tr>
						<th>Predefined Field</th>
						<th>Mapped Column</th>
					</tr>
				</thead>
				<tbody>
					{predefinedFields.map((field) => (
						<tr key={field}>
							<td>{field}</td>
							<td>
								<Select
									data={columnNames}
									value={mapping[field] || ""}
									onChange={(value) => handleMappingChange(field, value || "")}
									placeholder="Select a column"
								/>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			<Button mt="md" onClick={() => console.log("Field Mapping:", mapping)}>
				Save Mapping
			</Button>
		</div>
	);
};

export default FieldMapping;
