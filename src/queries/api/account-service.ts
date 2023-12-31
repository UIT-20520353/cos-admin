import supabase from "~/queries/supabase";
import { IAccount, IManageAccount, ISimpleAccount } from "~/types/account.type";
import { PostgrestResponse } from "@supabase/supabase-js";
import { IAccountForm } from "~/types/form.type";
import CryptoJS from "crypto-js";

export async function getAccountList(searchText: string): Promise<IManageAccount[]> {
  try {
    const { data, error }: PostgrestResponse<IManageAccount> = await supabase
      .rpc("get_account_list", { search_text: searchText })
      .then((response) => response as PostgrestResponse<IManageAccount>);
    if (error) {
      console.error("getAccountList :", error);
      return [];
    } else {
      if (data && data.length !== 0) {
        // await new Promise((resolve) => setTimeout(resolve, 3000));
        return data;
      } else return [];
    }
  } catch (error) {
    console.error("getAccountList :", error);
    return [];
  }
}

export async function checkAccountExist(username: string): Promise<boolean> {
  try {
    const { data, error } = await supabase.rpc("check_exist", { user_name: username });
    if (error) {
      throw error;
    } else {
      return !!data;
    }
  } catch (error) {
    console.error("checkAccountExist: ", error);
    return false;
  }
}

export async function checkEmailExist(email: string): Promise<boolean> {
  try {
    const { data, error } = await supabase.from("accounts").select("*").eq("email", email);
    if (error) {
      throw error;
    } else {
      if (data && data.length > 0) return true;
      else return false;
    }
  } catch (error) {
    console.error("checkAccountExist: ", error);
    return false;
  }
}

export async function handleLogin(username: string, password: string): Promise<ISimpleAccount> {
  const failResult: ISimpleAccount = {
    id: -1,
    name: ""
  };

  try {
    const { data, error }: PostgrestResponse<ISimpleAccount> = await supabase
      .rpc("handle_login", {
        password_login: password,
        role_login: 1,
        username_login: username
      })
      .then((response) => response as PostgrestResponse<ISimpleAccount>);
    if (error) {
      console.error("handleLogin :", error);
      return failResult;
    } else {
      if (data && data.length !== 0) return data[0];
      else return failResult;
    }
  } catch (error) {
    console.error("handleLogin :", error);
    return failResult;
  }
}

export async function getAccountById(id: number): Promise<IAccount[] | undefined> {
  try {
    const { data, error }: PostgrestResponse<IAccount> = await supabase
      .from("accounts")
      .select("*")
      .eq("id", id)
      .then((response) => response as PostgrestResponse<IAccount>);
    if (error) console.error("getAccountById :", error);
    else {
      return data;
    }
  } catch (error) {
    console.error("getAccountById :", error);
  }
}

export async function insertAccount(formData: IAccountForm): Promise<boolean> {
  try {
    let hashPassword: string;
    if (formData.role === "CANDIDATE") hashPassword = CryptoJS.SHA256("thisinh123").toString();
    else hashPassword = CryptoJS.SHA256("bantochuc123").toString();

    const { data, error }: PostgrestResponse<IAccount> = await supabase
      .from("accounts")
      .insert({
        name: formData.name,
        username: formData.username,
        password: hashPassword,
        role_id: formData.role === "CANDIDATE" ? 3 : 2,
        email: formData.email === "" ? null : formData.email,
        phone: formData.phone === "" ? null : formData.phone,
        address: formData.address === "" ? null : formData.address,
        host_id: formData.role === "CANDIDATE" ? null : formData.host_id
      })
      .select("*")
      .then((response) => response as PostgrestResponse<IAccount>);
    if (error) {
      console.error("insertAccount :", error);
      return false;
    } else {
      return !!data;
    }
  } catch (error) {
    console.error("insertAccount :", error);
    return false;
  }
}

export async function deleteAccountById(id: number): Promise<boolean> {
  try {
    const { error } = await supabase.from("accounts").delete().eq("id", id);
    if (error) {
      console.error("deleteAccountById: ", error);
      return false;
    } else return true;
  } catch (error) {
    console.error("deleteAccountById", error);
    return false;
  }
}

export async function updateAccountInfoById(
  id: number,
  name: string,
  email: string,
  phone: string,
  address: string
): Promise<IAccount> {
  const failResult: IAccount = {
    id: -1,
    name: "",
    username: "",
    password: "",
    email: null,
    phone: null,
    address: null,
    role_id: -1,
    host_id: null
  };
  try {
    const { data, error }: PostgrestResponse<IAccount> = await supabase
      .from("accounts")
      .update({
        name: name,
        email: email,
        phone: phone === "" ? null : phone,
        address: address === "" ? null : address
      })
      .eq("id", id)
      .select("*")
      .then((response) => response as PostgrestResponse<IAccount>);

    if (error) {
      console.error("updateAccountInfoById: ", error);
      return failResult;
    } else {
      if (data && data.length !== 0) return data[0];
      else return failResult;
    }
  } catch (error) {
    console.error("updateAccountInfoById: ", error);
    return failResult;
  }
}
