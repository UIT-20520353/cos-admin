import supabase from "~/queries/supabase";
import { IAccount, IManageAccount } from "~/types/account.type";
import { PostgrestResponse } from "@supabase/supabase-js";
import { IAccountForm } from "~/types/form.type";
import CryptoJS from "crypto-js";

export async function getAccountList(): Promise<IManageAccount[]> {
  try {
    const { data, error }: PostgrestResponse<IManageAccount> = await supabase
      .rpc("get_account_list")
      .then((response) => response as PostgrestResponse<IManageAccount>);
    if (error) console.error("getAccountList :", error);
    else return data;
    return [];
  } catch (error) {
    console.error("getAccountList :", error);
  }
}

export async function checkAccountExist(username: string): Promise<boolean> {
  const { data, error } = await supabase.rpc("check_exist", { user_name: username });
  if (error) console.error(error);
  else {
    return !!data;
  }
  return false;
}

export async function handleLogin(username: string, password: string): Promise<number> {
  try {
    const { data, error } = await supabase.rpc("handle_login", {
      user_name: username,
      input_password: password,
      role: 1
    });
    if (error) console.error("handleLogin :", error);
    else {
      return data;
    }
  } catch (error) {
    console.error("handleLogin :", error);
  }
}

export async function getAccountById(id: number): Promise<IAccount[]> {
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
  }
}

export async function updateAccountInfoById(
  id: number,
  name: string,
  email: string,
  phone: string,
  address: string
): Promise<IAccount[]> {
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

    if (error) console.error("updateAccountInfoById: ", error);
    else return data;
  } catch (error) {
    console.error("updateAccountInfoById: ", error);
  }
}
