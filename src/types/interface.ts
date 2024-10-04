export interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  available: number;
  reserved: number;
  productID: string;
  quantity: number;
  priceunit: string;
  unit: string;
  sku: string;
  store: Store;
  weight: string;
  manufacturer: string;
  brand: Brand;
  category: {
    _id: string;
    name: string;
  };
  createdBy: {
    _id: string;
    username: string;
    password: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };

  location: string;
  productImage: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface getAllAmount {
  totalStock: number;
}
export interface User {
  _id: string;
  username: string;
  name: string;
  role: string;
}
export interface Categories {
  _id: string;
  name: string;
  productCount: number;
  createdBy: {
    name: string;
    email: string;
    role: string;
  };
}
export interface Store {
  storeImage: string;
  _id: string;
  storename: string;
  location: string;
  owner: User;
  product: Product[];
}

export interface StoreState {
  currentStore: Store | null;
  store: Store[];
  loading: boolean;
  error: string | null;
}
export interface Brand {
  _id: string;
  name: string;
  prefix: string;
  addedBy: User;
}

export interface LowStockItem {
  _id: string;
  lowStock: number;
  total: number;
  products: Product;
}

export interface ProductState {
  products: Product[];
  brand: Brand[];
  lowStock: LowStockItem[];
  totalAmount: getAllAmount[];
  loading: boolean;
  error: string | null;
}

export interface ErrorResponse {
  message: string;
}

export interface UpdateUserArgs {
  userId: string;
  role: string;
}
export interface History {
  userId: string;
  user: User;
  ipAddress: string;
  loginFailed: boolean;
  loginTime: Date;
  userAgent: string;
}
export interface CartItem {
  product: Product;
  quantity: number;
}
export interface CartState {
  items: CartItem[];
  loading: boolean;
  outOfStock: boolean;
  error: string | null;
}
export type Price = {
  _id: string;
  name: string;
  unit: string;
  description: string;
  addedBy: User;
};
export interface User {
  name: string;
  role: string;
}
export interface PriceState {
  price: Price[];
  loading: boolean;
  error: string | null;
}
export interface Store {
  storeImage: string;
  _id: string;
  storename: string;
  location: string;
  owner: User;
  product: Product[];
}

export interface StoreState {
  store: Store[];
  loading: boolean;
  error: string | null;
}
export interface Unit {
  name: string;
  unit: string;
}

export interface UnitState {
  unit: Unit[];
  loading: boolean;
  error: string | null;
}
export interface Customer {
  _id: string;
  customername: string;
  email: string;
  phone: string;
  amount: number;
}

export interface CustomerState {
  customer: Customer[];
  error: string | null;
  totalcustomer: number;
  loading: boolean;
}
export interface Payment {
  _id: string;
  createdBy: User;
  products: Product;
  status: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface PaymentSummary {
  _id: {
    month: number;
    year: number;
  };
  totalPayments: number;
  totalAmount: number;
  monthName: string;
}
export interface ErrorResponse {
  message: string;
}

export interface PaymentState {
  payments: Payment[]; // Changed to 'payments' to reflect multiple payments
  loading: boolean;
  paymentSummary: PaymentSummary[];
  amount: number | null;
  error: string | null;
}
export interface CheckBoxProp {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}

export interface IStoreModal {
  onClose: () => void;
  isEdit: boolean;
  storeId: string;
}
