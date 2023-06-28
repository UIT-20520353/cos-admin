import supabase from "~/queries/supabase";
import { PostgrestResponse } from "@supabase/supabase-js";
import { IHost } from "~/types/host.type";
import { IHostForm } from "~/types/form.type";

export async function getHostList(): Promise<IHost[]> {
  try {
    const { data, error }: PostgrestResponse<IHost> = await supabase
      .from("hosts")
      .select("*")
      .then((response) => response as PostgrestResponse<IHost>);
    if (error) {
      console.error("getHostList: ", error);
      return [];
    } else {
      if (data && data.length !== 0) return data;
      else return [];
    }
  } catch (error) {
    console.error("getHostList: ", error);
    return [];
  }
}

export async function addHost(formData: IHostForm): Promise<IHost[] | undefined> {
  try {
    const { data, error }: PostgrestResponse<IHost> = await supabase
      .from("hosts")
      .insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address
      })
      .select("*")
      .then((response) => response as PostgrestResponse<IHost>);
    if (error) console.error("addHost: ", error);
    else return data;
  } catch (error) {
    console.error("addHost: ", error);
  }
}

export async function deleteHost(id: number): Promise<boolean | undefined> {
  try {
    const { error } = await supabase.from("hosts").delete().eq("id", id);
    if (error) {
      console.error("deleteHost: ", error);
      return false;
    } else return true;
  } catch (error) {
    console.error("deleteHost: ", error);
  }
}

export async function getHostInfoById(id: number | null): Promise<IHost> {
  const failResult: IHost = {
    id: -1,
    name: "",
    address: "",
    phone: "",
    email: ""
  };

  try {
    if (!id) return failResult;
    const { data, error }: PostgrestResponse<IHost> = await supabase
      .from("hosts")
      .select("*")
      .eq("id", id)
      .then((response) => response as PostgrestResponse<IHost>);
    if (error) {
      console.error("getHostList: ", error);
      return failResult;
    } else {
      if (data && data.length !== 0) return data[0];
      else return failResult;
    }
  } catch (error) {
    console.error("getHostList: ", error);
    return failResult;
  }
}

export async function updateHostInfoById(id: number, formData: IHostForm): Promise<IHost[] | undefined> {
  try {
    const { data, error }: PostgrestResponse<IHost> = await supabase
      .from("hosts")
      .update({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address
      })
      .eq("id", id)
      .select("*")
      .then((response) => response as PostgrestResponse<IHost>);
    if (error) console.error("updateHostInfoById: ", error);
    else return data;
  } catch (error) {
    console.error("updateHostInfoById: ", error);
  }
}
