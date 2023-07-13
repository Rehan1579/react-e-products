import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ProductService } from "@/services";
import { EBusyLoader } from "@/components/shared";
import { useEffect, useState } from "react";
import { IProduct } from "@/interfaces";


export default function ProductAddEditPage()
{
    const inputStyle = {
        background: "#fff"
    };


    const { productId } = useParams();
	const {
		isLoading,
		isError,
		error,
		data: productInfo,
	} = useQuery(["product_detail", productId], () => {
		return productId ? ProductService.getProductById(productId) : ProductService.newProduct();
	});

    const [product, setProduct] = useState<IProduct>(productInfo);


    useEffect(() => {
		
        console.log(productInfo);
        if (productInfo)
        {
			setProduct(productInfo);
		}

	}, [isLoading]);
    

    if (isLoading)
    {
		return <EBusyLoader message="Getting Product Info" isLoading={isLoading} />;
	}


	if (isError)
    {
		const err: any = error;
		return <p>{err.message}</p>;
	}


    const handleInputChange = (name: string, value: string) => {
        setProduct((oldInfo) => ({
			...oldInfo,
			[name]: value,
		}));
    }


    const handleSave = () => {
        console.log(product);
    }


    const handleDelete = () => {
        console.log(product.id);
    }
    

    return (
		<div className="container">
			<div className="row">
				<div className="col-12 my-4">
					<h5 className="text-center">Product Form</h5>
				</div>

				<div className="col-12 mb-3">
					<TextField style={inputStyle} disabled label="ID" fullWidth value={productInfo.id} />
				</div>

				<div className="col-12 col-sm-6 mb-3">
					<TextField
						name="title"
						style={inputStyle}
						label="Title"
						fullWidth
						required
						value={productInfo.title}
						onChange={(e) => handleInputChange(e.target.name, e.target.value)}
					/>
				</div>
				<div className="col-12 col-sm-6 mb-3">
					<TextField
						name="category"
						style={inputStyle}
						label="Category"
						fullWidth
						required
						value={productInfo.category}
						onChange={(e) => handleInputChange(e.target.name, e.target.value)}
					/>
				</div>

				<div className="col-12 col-sm-4 mb-3">
					<TextField
						name="price"
						style={inputStyle}
						label="Price"
						fullWidth
						type="number"
						required
						value={productInfo.price}
						onChange={(e) => handleInputChange(e.target.name, e.target.value)}
					/>
				</div>
				<div className="col-12 col-sm-4 mb-3">
					<TextField
						name="discountPercentage"
						style={inputStyle}
						label="Discount (%)"
						fullWidth
						type="number"
						value={productInfo.discountPercentage}
						onChange={(e) => handleInputChange(e.target.name, e.target.value)}
					/>
				</div>
				<div className="col-12 col-sm-4 mb-3">
					<TextField
						name="stock"
						style={inputStyle}
						label="Stock"
						fullWidth
						type="number"
						required
						value={productInfo.stock}
						onChange={(e) => handleInputChange(e.target.name, e.target.value)}
					/>
				</div>

				<div className="col-12 col-sm-12 mb-3">
					<TextField
						name="description"
						style={inputStyle}
						label="Description"
						fullWidth
						multiline
						rows={3}
						value={productInfo.description}
						onChange={(e) => handleInputChange(e.target.name, e.target.value)}
					/>
				</div>

				<Stack direction="row" spacing={2}>
					<Button onClick={handleSave} style={{ background: "#88d3ee", color: "black", width: "100%" }} variant="contained" endIcon={<SendIcon />}>
						SAVE
					</Button>

					{productId && (
						<IconButton onClick={handleDelete} edge="start">
							<DeleteIcon />
						</IconButton>
					)}
				</Stack>
			</div>
		</div>
	);
}
