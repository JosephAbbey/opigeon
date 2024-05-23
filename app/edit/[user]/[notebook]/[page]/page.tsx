import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { CommandMenu } from "@/components/ui/command-menu";
import TeamSwitcher from "@/components/ui/team-switcher";
import { UserNav } from "@/components/ui/user-nav";
import { ScrollArea } from "@/components/ui/scroll-area";
import Editor from "@/components/ui/editor";
import Tree from "@/components/ui/tree";
import { Folder, Notebook, NotebookPen, TestTube } from "lucide-react";

export default function Page({
  params,
}: {
  params: { user: string; notebook: string; page: string };
}) {
  return (
    <>
      <CommandMenu />
      <div className="hidden h-screen flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <TeamSwitcher />
            <Breadcrumb className="mx-auto font-bold">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/view/${params.user}`}>
                    {params.user}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={`/view/${params.user}/${params.notebook}`}
                  >
                    {params.notebook}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{params.page}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="ml-auto flex items-center space-x-4">
              <ThemeSwitcher />
              <UserNav />
            </div>
          </div>
        </div>
        <div className="m-3 h-0 flex-grow rounded-md border">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={25}>
              <ScrollArea className="h-full p-4">
                <Tree
                  notebook={[
                    {
                      title: "Test",
                      path: "test",
                      icon: <TestTube />,
                    },
                    {
                      title: "Folder",
                      path: "folder",
                      icon: <Folder />,

                      subnotes: [
                        {
                          title: "Subnote",
                          path: "folder/subnote",
                          icon: <Notebook />,
                        },
                        {
                          title: "Subnote 1",
                          path: "folder/subnote_1",
                          icon: <NotebookPen />,
                        },
                      ],
                    },
                  ]}
                />
              </ScrollArea>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={75}>
              <ScrollArea className="h-full p-4">
                <Editor />
              </ScrollArea>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </>
  );
}
